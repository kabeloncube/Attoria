const express = require('express');
const rateLimit = require('express-rate-limit');
const Redis = require('ioredis');

module.exports = function() {
  const router = express.Router();

  // Simple mapping for known region hosts
  const REGION_HOSTS = {
    west: 'https://west.albion-online-data.com',
    europe: 'https://europe.albion-online-data.com',
    east: 'https://east.albion-online-data.com',
    default: 'https://www.albion-online-data.com'
  };

  // Basic in-memory cache (Map) with TTL handling (fallback)
  const cache = new Map(); // key -> { expires: timestamp, data }
  const DEFAULT_TTL_SECONDS = Number(process.env.ALBION_CACHE_TTL) || 60; // 60s cache by default
  const MAX_CACHE_ENTRIES = 2000;

  // Redis client (optional). Use REDIS_URL env var if provided.
  let redis = null;
  const REDIS_URL = process.env.REDIS_URL || process.env.REDIS_URI || null;
  if (REDIS_URL) {
    try {
      redis = new Redis(REDIS_URL);
      redis.on('error', (err) => console.warn('Redis error:', err && err.message));
    } catch (err) {
      console.warn('Failed to initialize Redis client, falling back to in-memory cache:', err && err.message);
      redis = null;
    }
  }

  function makeCacheKey(region, item, params) {
    // params should be a plain object; we stringify sorted keys for stability
    const keys = Object.keys(params || {}).sort();
    const parts = keys.map(k => `${k}=${params[k]}`);
    return `${region}::${item}::${parts.join('&')}`;
  }

  function getFromCache(key) {
    const entry = cache.get(key);
    if (!entry) return null;
    if (Date.now() > entry.expires) {
      cache.delete(key);
      return null;
    }
    return entry.data;
  }

  function setCache(key, data, ttlSeconds = DEFAULT_TTL_SECONDS) {
    // simple eviction if too many entries
    if (cache.size > MAX_CACHE_ENTRIES) {
      // remove oldest (not optimal, but acceptable for small cache)
      const firstKey = cache.keys().next().value;
      if (firstKey) cache.delete(firstKey);
    }
    cache.set(key, { expires: Date.now() + ttlSeconds * 1000, data });
  }

  // Redis helpers (async). Use Redis when available; otherwise operate on in-memory cache.
  async function redisGet(key) {
    if (!redis) return null;
    try {
      const val = await redis.get(key);
      if (!val) return null;
      return JSON.parse(val);
    } catch (err) {
      console.warn('Redis get error:', err && err.message);
      return null;
    }
  }

  async function redisSet(key, data, ttlSeconds = DEFAULT_TTL_SECONDS) {
    if (!redis) return false;
    try {
      await redis.set(key, JSON.stringify(data), 'EX', Math.max(5, Math.min(ttlSeconds, 86400)));
      return true;
    } catch (err) {
      console.warn('Redis set error:', err && err.message);
      return false;
    }
  }

  // Unified cache access: try Redis first (if configured), fall back to memory cache
  async function getCached(key) {
    if (redis) {
      const r = await redisGet(key);
      if (r != null) return r;
    }
    return getFromCache(key);
  }

  async function setCached(key, data, ttlSeconds = DEFAULT_TTL_SECONDS) {
    // attempt redis set (best-effort), then update in-memory cache
    if (redis) {
      await redisSet(key, data, ttlSeconds).catch(() => {});
    }
    setCache(key, data, ttlSeconds);
  }

  // per-route rate limiter to protect upstream APIs and your server
  const proxyLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 60, // max 60 requests per minute per IP (increased for better UX)
    message: { error: 'Too many proxy requests, please slow down' },
    standardHeaders: true,
    legacyHeaders: false
  });

  // small retry helper for transient upstream failures
  async function fetchWithRetry(url, opts = {}, retries = 2, backoff = 300) {
    try {
      const resp = await fetch(url, opts);
      if (!resp.ok && retries > 0 && (resp.status >= 500 || resp.status === 429)) {
        // transient, retry
        await new Promise(r => setTimeout(r, backoff));
        return fetchWithRetry(url, opts, retries - 1, backoff * 2);
      }
      return resp;
    } catch (err) {
      if (retries > 0) {
        await new Promise(r => setTimeout(r, backoff));
        return fetchWithRetry(url, opts, retries - 1, backoff * 2);
      }
      throw err;
    }
  }

  // validate simple item id format (uppercase, numbers, underscores, dashes, colons, @)
  const ITEM_ID_RE = /^[A-Z0-9_:\-@]{2,120}$/;

  // GET /prices?region=europe&item=T4_BAG&locations=Caerleon&qualities=1
  router.get('/prices', proxyLimiter, async (req, res) => {
    try {
      const { region = 'default', item, ttl } = req.query;
      const other = { ...req.query };
      delete other.region; delete other.item; delete other.ttl;

      // Input validation
      if (!item) {
        return res.status(400).json({
          error: 'Missing required query parameter: item',
          code: 'MISSING_ITEM_PARAM'
        });
      }

      // validate item param
      if (typeof item !== 'string' || !ITEM_ID_RE.test(item)) {
        return res.status(400).json({
          error: 'Invalid item id format. Expected format like T4_BAG or T4_BAG@1 for enchanted items',
          code: 'INVALID_ITEM_FORMAT',
          provided: item
        });
      }

      // Validate region
      if (region && !REGION_HOSTS[region]) {
        return res.status(400).json({
          error: 'Invalid region. Supported: west, europe, east, default',
          code: 'INVALID_REGION',
          provided: region,
          supported: Object.keys(REGION_HOSTS)
        });
      }

      const resolvedRegion = (region && REGION_HOSTS[region]) ? region : 'default';
      const host = REGION_HOSTS[resolvedRegion] || REGION_HOSTS.default;

      const params = new URLSearchParams(other || {});
      const path = `/api/v2/stats/prices/${encodeURIComponent(item)}.json`;
      const url = `${host}${path}${params.toString() ? '?' + params.toString() : ''}`;

      console.log(`Albion API Request: ${url}`);

      const cacheKey = makeCacheKey(resolvedRegion, item, other);
      const cached = await getCached(cacheKey);
      if (cached) {
        console.log(`Cache hit for ${item}`);
        return res.json({ cached: true, data: cached, region: resolvedRegion });
      }

      // fetch with retries and better error handling
      const resp = await fetchWithRetry(url, { method: 'GET' });
      const contentType = resp.headers.get('content-type') || 'application/json';

      if (!resp.ok) {
        const text = await resp.text();
        console.error(`Albion API error ${resp.status}:`, text.substring(0, 200));

        // Handle specific error codes
        if (resp.status === 404) {
          return res.status(404).json({
            error: 'Item not found or no market data available',
            code: 'ITEM_NOT_FOUND',
            item: item,
            region: resolvedRegion
          });
        }

        if (resp.status === 429) {
          return res.status(429).json({
            error: 'Rate limit exceeded. Please try again later.',
            code: 'RATE_LIMITED',
            retryAfter: resp.headers.get('retry-after') || '60'
          });
        }

        return res.status(resp.status).json({
          error: 'Albion API error',
          code: 'API_ERROR',
          status: resp.status,
          message: text.substring(0, 200)
        });
      }

      const data = await resp.json();

      // Validate response data
      if (!Array.isArray(data)) {
        console.error('Invalid API response format:', typeof data);
        return res.status(502).json({
          error: 'Invalid response from Albion API',
          code: 'INVALID_RESPONSE_FORMAT'
        });
      }

      // cache response body (data) for ttl seconds if numeric ttl provided or default
      const ttlSeconds = Number(ttl) > 0 ? Math.min(Math.max(Number(ttl), 5), 3600) : DEFAULT_TTL_SECONDS;
      await setCached(cacheKey, data, ttlSeconds);

      console.log(`Successfully fetched ${data.length} price records for ${item}`);
      res.json({
        cached: false,
        data,
        region: resolvedRegion,
        count: data.length
      });

    } catch (err) {
      console.error('Albion proxy error:', err);

      // Handle specific error types
      if (err.name === 'AbortError') {
        return res.status(408).json({
          error: 'Request timeout',
          code: 'TIMEOUT'
        });
      }

      if (err.code === 'ECONNREFUSED' || err.code === 'ENOTFOUND') {
        return res.status(503).json({
          error: 'Albion API service unavailable',
          code: 'SERVICE_UNAVAILABLE'
        });
      }

      res.status(500).json({
        error: 'Internal server error',
        code: 'INTERNAL_ERROR',
        message: err.message
      });
    }
  });

  // GET /items/search?q=fiber&limit=10&tier=4 - Search for items by name (tier-aware)
  router.get('/items/search', proxyLimiter, async (req, res) => {
    try {
      let { q: query, limit = 10, tier } = req.query;

      if (!query || typeof query !== 'string' || query.length < 2) {
        return res.status(400).json({ error: 'Query parameter "q" must be at least 2 characters' });
      }



      const cacheKey = `item_search_${query.toLowerCase()}_${limit}`;
      const cached = await getCached(cacheKey);
      if (cached) {
        return res.json({ cached: true, items: cached });
      }

      // Try AlbionDB API first (item references)
      let items = [];

      try {
        const albionDbUrl = `https://api.albiondb.com/v1/items/search?q=${encodeURIComponent(query)}&limit=${limit}`;
        const resp = await fetchWithRetry(albionDbUrl, { method: 'GET' });

          if (resp.ok) {
            const data = await resp.json();
            if (Array.isArray(data)) {
              let apiItems = data.map(item => ({
                id: item.UniqueName,
                name: item.LocalizedNames ? item.LocalizedNames['EN-US'] || item.Name : item.Name,
                tier: item.Tier,
                category: item.Category
              }));

              // Filter API results by tier if specified
              if (tier) {
                apiItems = apiItems.filter(item => item.tier == tier);
              }

              items = apiItems;
            }
          }
        } catch (err) {
          console.warn('AlbionDB search failed, trying fallback:', err.message);
        }

        // Fallback: Use data dumps API if AlbionDB fails
        if (items.length === 0) {
          try {
            // Try the data dumps API for items
            const dataDumpUrl = `https://www.albion-online-data.com/api/v2/stats/items/${encodeURIComponent(query)}*.json`;
            const resp = await fetchWithRetry(dataDumpUrl, { method: 'GET' });

            if (resp.ok) {
              const data = await resp.json();
              if (Array.isArray(data)) {
                // Extract unique item names and format them
                const uniqueItems = new Map();
                data.forEach(item => {
                  if (item.item_id && !uniqueItems.has(item.item_id)) {
                    uniqueItems.set(item.item_id, {
                      id: item.item_id,
                      name: item.item_id.replace(/_/g, ' ').replace(/T(\d+)/, 'Tier $1'),
                      tier: item.item_id.match(/T(\d+)/)?.[1] || 'Unknown',
                      category: 'Unknown'
                    });
                  }
                });
                let itemsArray = Array.from(uniqueItems.values());

                // Filter data dumps results by tier if specified
                if (tier) {
                  itemsArray = itemsArray.filter(item => item.tier == tier);
                }

                items = itemsArray.slice(0, limit);
              }
            }
          } catch (err) {
            console.warn('Data dumps search fallback failed:', err.message);
          }
        }

      // Final fallback: return empty array if all APIs fail
      // (users will see "no results" message)

    // Cache for 1 hour (3600 seconds)
    await setCached(cacheKey, items, 3600);

    res.json({ cached: false, items });
    } catch (err) {
      console.error('Item search error:', err);
      res.status(500).json({ error: 'Search error', message: err.message });
    }
  });

  // GET /gameinfo/events - Official Albion GameInfo API
  router.get(/^\/gameinfo\/(.+)/, proxyLimiter, async (req, res) => {
    try {
      const endpoint = req.params[0]; // Everything after /gameinfo/
      const queryParams = new URLSearchParams(req.query).toString();
      const url = `https://gameinfo.albiononline.com/api/gameinfo/${endpoint}${queryParams ? '?' + queryParams : ''}`;

      console.log(`Official GameInfo API Request: ${url}`);

      const cacheKey = `gameinfo_${endpoint}_${queryParams}`;
      const cached = await getCached(cacheKey);
      if (cached) {
        return res.json({ cached: true, ...cached });
      }

      const resp = await fetchWithRetry(url, { method: 'GET' });

      if (!resp.ok) {
        const text = await resp.text();
        console.error(`GameInfo API error ${resp.status}:`, text.substring(0, 200));
        return res.status(resp.status).json({
          error: 'Official GameInfo API error',
          code: 'GAMEINFO_API_ERROR',
          status: resp.status,
          message: text.substring(0, 200)
        });
      }

      const data = await resp.json();
      await setCached(cacheKey, data, DEFAULT_TTL_SECONDS * 2); // Cache longer for official API

      res.json({ cached: false, ...data });
    } catch (err) {
      console.error('GameInfo API error:', err);
      res.status(500).json({
        error: 'Official GameInfo API error',
        code: 'GAMEINFO_INTERNAL_ERROR',
        message: err.message
      });
    }
  });

  // GET /dumps/:filename - Data dumps API integration
  router.get(/^\/dumps\/(.+)/, proxyLimiter, async (req, res) => {
    try {
      const filename = req.params[0]; // Everything after /dumps/
      const url = `https://www.albion-online-data.com/api/dumps/${filename}`;

      console.log(`Data Dumps API Request: ${url}`);

      const cacheKey = `dump_${filename}`;
      const cached = await getCached(cacheKey);
      if (cached) {
        return res.json({ cached: true, data: cached });
      }

      const resp = await fetchWithRetry(url, { method: 'GET' });

      if (!resp.ok) {
        const text = await resp.text();
        console.error(`Data dumps API error ${resp.status}:`, text.substring(0, 200));
        return res.status(resp.status).json({
          error: 'Data dumps API error',
          code: 'DUMPS_API_ERROR',
          status: resp.status,
          message: text.substring(0, 200)
        });
      }

      const data = await resp.json();

      // Cache dumps for longer since they don't change often
      await setCached(cacheKey, data, DEFAULT_TTL_SECONDS * 10);

      res.json({ cached: false, data });
    } catch (err) {
      console.error('Data dumps API error:', err);
      res.status(500).json({
        error: 'Data dumps API error',
        code: 'DUMPS_INTERNAL_ERROR',
        message: err.message
      });
    }
  });

  // GET /validate/:itemId - Item ID validation endpoint
  router.get('/validate/:itemId', async (req, res) => {
    try {
      const { itemId } = req.params;

      if (!itemId || typeof itemId !== 'string') {
        return res.status(400).json({
          error: 'Invalid item ID',
          code: 'INVALID_ITEM_ID'
        });
      }

      // Check format
      const isValidFormat = ITEM_ID_RE.test(itemId);

      // Check if it exists in our known items (basic check)
      const knownPrefixes = ['T2_', 'T3_', 'T4_', 'T5_', 'T6_', 'T7_', 'T8_'];
      const hasKnownPrefix = knownPrefixes.some(prefix => itemId.startsWith(prefix));

      const result = {
        itemId,
        validFormat: isValidFormat,
        hasKnownPrefix,
        likelyValid: isValidFormat && hasKnownPrefix
      };

      // Try to fetch from API to verify it exists
      if (result.likelyValid) {
        try {
          const testUrl = `${REGION_HOSTS.default}/api/v2/stats/prices/${encodeURIComponent(itemId)}.json?locations=Caerleon`;
          const resp = await fetch(testUrl, { method: 'HEAD' }); // Just check if it exists
          result.exists = resp.ok;
        } catch (err) {
          result.exists = false;
        }
      }

      res.json(result);
    } catch (err) {
      console.error('Item validation error:', err);
      res.status(500).json({
        error: 'Validation error',
        code: 'VALIDATION_ERROR',
        message: err.message
      });
    }
  });

  return router;
};
