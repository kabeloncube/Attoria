const express = require('express');
const rateLimit = require('express-rate-limit');

module.exports = function({ fetchCoCAPI, authenticateToken }) {
  const router = express.Router();

  // rate limiter for CoC proxy endpoints
  const cocLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 40, // 40 requests per minute per IP
    message: { error: 'Too many CoC proxy requests, please slow down' },
    standardHeaders: true,
    legacyHeaders: false
  });

  // Tag validation: allow letters, numbers, # and - up to 30 chars
  const TAG_RE = /^[#A-Za-z0-9\-]{1,60}$/;

  function encodeTag(tag) {
    const clean = String(tag).replace('#', '');
    return encodeURIComponent(`#${clean}`);
  }

  router.get('/clans/:clanTag', cocLimiter, async (req, res) => {
    try {
      const { clanTag } = req.params;
      if (!TAG_RE.test(clanTag)) return res.status(400).json({ error: 'Invalid clan tag' });
      const encodedTag = encodeTag(clanTag);
      const data = await fetchCoCAPI(`/clans/${encodedTag}`);
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: 'Proxy error', message: err.message });
    }
  });

  router.get('/clans/:clanTag/members', cocLimiter, async (req, res) => {
    try {
      const { clanTag } = req.params;
      if (!TAG_RE.test(clanTag)) return res.status(400).json({ error: 'Invalid clan tag' });
      const encodedTag = encodeTag(clanTag);
      const clanData = await fetchCoCAPI(`/clans/${encodedTag}`);
      res.json({ members: clanData.memberList || [] });
    } catch (err) {
      res.status(500).json({ error: 'Proxy error', message: err.message });
    }
  });

  router.get('/clans/:clanTag/warlog', cocLimiter, async (req, res) => {
    try {
      const { clanTag } = req.params;
      if (!TAG_RE.test(clanTag)) return res.status(400).json({ error: 'Invalid clan tag' });
      const encodedTag = encodeTag(clanTag);
      const data = await fetchCoCAPI(`/clans/${encodedTag}/warlog`);
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: 'Proxy error', message: err.message });
    }
  });

  router.get('/player/:playerTag', cocLimiter, async (req, res) => {
    try {
      const { playerTag } = req.params;
      if (!TAG_RE.test(playerTag)) return res.status(400).json({ error: 'Invalid player tag' });
      const encoded = encodeTag(playerTag);
      const data = await fetchCoCAPI(`/players/${encoded}`);
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: 'Proxy error', message: err.message });
    }
  });

  router.get('/clans/search', cocLimiter, async (req, res) => {
    try {
      const { name, limit = 10, after } = req.query;
      if (!name) return res.status(400).json({ error: 'Clan name is required' });
      let url = `/clans?name=${encodeURIComponent(String(name))}&limit=${encodeURIComponent(limit)}`;
      if (after) url += `&after=${encodeURIComponent(String(after))}`;
      const data = await fetchCoCAPI(url);
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: 'Proxy error', message: err.message });
    }
  });

  router.get('/leagues/legend', cocLimiter, async (req, res) => {
    try {
      const { locationId = 'global', limit = 200 } = req.query;
      const data = await fetchCoCAPI(`/locations/${encodeURIComponent(locationId)}/rankings/players?limit=${encodeURIComponent(limit)}`);
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: 'Proxy error', message: err.message });
    }
  });

  router.get('/locations', cocLimiter, async (req, res) => {
    try {
      const data = await fetchCoCAPI('/locations');
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: 'Proxy error', message: err.message });
    }
  });

  // Optional render/image proxy for CoC assets. Controlled by env variable whitelist.
  router.get('/render', cocLimiter, async (req, res) => {
    try {
      const { src } = req.query;
      const whitelist = process.env.COC_IMAGE_WHITELIST; // comma-separated allowed origins
      if (!src) return res.status(400).json({ error: 'Missing src query parameter' });
      if (!whitelist) return res.status(400).json({ error: 'Image proxy not enabled (set COC_IMAGE_WHITELIST)'});
      const allowed = whitelist.split(',').map(s => s.trim()).filter(Boolean);
      const url = String(src);
      const allowedMatch = allowed.some(a => url.startsWith(a));
      if (!allowedMatch) return res.status(403).json({ error: 'Requested image host not allowed' });

      // stream image from upstream
      const upstream = await fetch(url, { method: 'GET' });
      if (!upstream.ok) return res.status(upstream.status).send(await upstream.text());
      res.setHeader('Content-Type', upstream.headers.get('content-type') || 'application/octet-stream');
      res.setHeader('Cache-Control', 'public, max-age=3600');
      upstream.body.pipe(res);
    } catch (err) {
      res.status(500).json({ error: 'Image proxy error', message: err.message });
    }
  });

  return router;
};
