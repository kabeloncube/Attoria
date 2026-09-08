const express = require('express');
const rateLimit = require('express-rate-limit');
const logger = require('../logger');

const GAMEINFO_BASE = 'https://gameinfo.albiononline.com/api/gameinfo';
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

  async function request(path) {
    const response = await fetch(`${GAMEINFO_BASE}${path}`, {
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

  router.get('/search', proxyLimiter, async (req, res) => {
    const query = String(req.query.q || '').trim();
    if (query.length < 2 || query.length > 80) {
      return res.status(400).json({ error: 'Search must contain between 2 and 80 characters' });
    }

    try {
      return res.json(await request(`/search?q=${encodeURIComponent(query)}`));
    } catch (error) {
      logger.warn('Albion PvP player search failed: %s', error.message);
      return res.status(error.status || 502).json({
        error: 'Official Albion player search is temporarily unavailable',
        code: 'GAMEINFO_UNAVAILABLE'
      });
    }
  });

  router.get('/players/:playerId/:kind', proxyLimiter, async (req, res) => {
    const { playerId, kind } = req.params;
    if (!ID_RE.test(playerId) || !['kills', 'deaths'].includes(kind)) {
      return res.status(400).json({ error: 'Invalid player history request' });
    }

    try {
      return res.json(await request(`/players/${encodeURIComponent(playerId)}/${kind}?offset=0&limit=50`));
    } catch (error) {
      logger.warn('Albion PvP %s history failed: %s', kind, error.message);
      return res.status(error.status || 502).json({
        error: `Official Albion ${kind} history is temporarily unavailable`,
        code: 'GAMEINFO_UNAVAILABLE'
      });
    }
  });

  return router;
};
