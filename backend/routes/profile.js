const express = require('express');

module.exports = function depsFactory(deps) {
  const router = express.Router();
  const { authenticateToken, fetchCoCAPI, fetchCoCAPIWithPlayerToken, sanitizeInput, db } = deps;

  const profileController = require('../controllers/profileController')({ db, fetchCoCAPI, fetchCoCAPIWithPlayerToken, sanitizeInput });

  // All profile routes require authentication
  router.use(authenticateToken);

  router.post('/verify-token', profileController.verifyToken);
  router.post('/complete-token-link', profileController.completeTokenLink);
  router.post('/link-player', profileController.linkPlayer);
  router.get('/linked-players', profileController.linkedPlayers);
  router.put('/set-primary/:linkId', profileController.setPrimary);
  router.post('/link-player-json', profileController.linkPlayerJson);
  router.delete('/unlink-player/:linkId', profileController.unlinkPlayer);
  router.get('/player/:playerTag', profileController.getPlayerProfile);
  router.get('/clan-war-status', profileController.clanWarStatus);

  return router;
};
