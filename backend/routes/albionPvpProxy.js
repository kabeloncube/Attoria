const express = require('express');
const rateLimit = require('express-rate-limit');
const logger = require('../logger');

const REGION_BASES = {
  americas: 'https://gameinfo.albiononline.com/api/gameinfo',
  europe: 'https://gameinfo-ams.albiononline.com/api/gameinfo',
  asia: 'https://gameinfo-sgp.albiononline.com/api/gameinfo'
};
const ID_RE = /^[A-Za-z0-9_-]{2,100}$/;

module.exports = function() {
  const router = express.Router();
  const proxyLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 30,
    message: { error: 'Too many PvP requests, please slow down' },
    standardHeaders: true,
    legacyHeaders: false
  });

  async function request(region, path) {
    const response = await fetch(`${REGION_BASES[region]}${path}`, {
      headers: { accept: 'application/json' }
    });
    if (!response.ok) {
      const message = await response.text();
      const error = new Error(`GameInfo request failed with ${response.status}`);
      error.status = response.status;
      error.details = message.slice(0, 300);
      throw error;
    }
    return response.json();
  }

  function getRegion(req, res) {
    const region = String(req.query.region || 'europe').toLowerCase();
    if (!Object.hasOwn(REGION_BASES, region)) {
      res.status(400).json({ error: 'Region must be americas, europe, or asia' });
      return null;
    }
    return region;
  }

  router.get('/events', proxyLimiter, async (req, res) => {
    const region = getRegion(req, res);
    if (!region) return;

    const limit = Number.parseInt(req.query.limit, 10) || 20;
    const offset = Number.parseInt(req.query.offset, 10) || 0;
    if (limit < 1 || limit > 51 || offset < 0 || offset > 1000) {
      return res.status(400).json({ error: 'Limit must be 1–51 and offset 0–1000' });
    }

    const guildId = req.query.guildId ? String(req.query.guildId) : '';
    if (guildId && !ID_RE.test(guildId)) {
      return res.status(400).json({ error: 'Invalid guild ID' });
    }

    const params = new URLSearchParams({ limit: String(limit), offset: String(offset) });
    if (guildId) params.set('guildId', guildId);

    try {
      return res.json(await request(region, `/events?${params.toString()}`));
    } catch (error) {
      logger.warn('Albion PvP event feed failed (%s): %s', region, error.message);
      return res.status(error.status || 502).json({
        error: 'Live Albion kill events are temporarily unavailable',
        code: 'GAMEINFO_UNAVAILABLE'
      });
    }
  });

  router.get('/search', proxyLimiter, async (req, res) => {
    const query = String(req.query.q || '').trim();
    const region = getRegion(req, res);
    if (!region) return;
    if (query.length < 2 || query.length > 80) {
      return res.status(400).json({ error: 'Search must contain between 2 and 80 characters' });
    }

    try {
      return res.json(await request(region, `/search?q=${encodeURIComponent(query)}`));
    } catch (error) {
      logger.warn('Albion PvP player search failed (%s): %s', region, error.message);
      return res.status(error.status || 502).json({
        error: 'Official Albion player search is temporarily unavailable',
        code: 'GAMEINFO_UNAVAILABLE'
      });
    }
  });

  router.get('/players/:playerId/:kind', proxyLimiter, async (req, res) => {
    const { playerId, kind } = req.params;
    const region = getRegion(req, res);
    if (!region) return;
    if (!ID_RE.test(playerId) || !['kills', 'deaths'].includes(kind)) {
      return res.status(400).json({ error: 'Invalid player history request' });
    }

    try {
      return res.json(await request(region, `/players/${encodeURIComponent(playerId)}/${kind}?offset=0&limit=50`));
    } catch (error) {
      logger.warn('Albion PvP %s history failed (%s): %s', kind, region, error.message);
      return res.status(error.status || 502).json({
        error: `Official Albion ${kind} history is temporarily unavailable`,
        code: 'GAMEINFO_UNAVAILABLE'
      });
    }
  });

  return router;
};
