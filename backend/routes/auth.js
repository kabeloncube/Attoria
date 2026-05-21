const express = require('express');
const { body, validationResult } = require('express-validator');

module.exports = function depsFactory(deps) {
  const router = express.Router();
  const {
    db,
    authLimiter,
    bcrypt,
    jwt,
    JWT_SECRET,
    sanitizeInput,
    validatePassword,
    validateEmail,
  } = deps;

  const authController = require('../controllers/authController')({
    db,
    bcrypt,
    jwt,
    JWT_SECRET,
    sanitizeInput,
    validatePassword,
    validateEmail,
  });

  // POST /api/register
  router.post(
    '/register',
    authLimiter,
    [
      body('username')
        .isLength({ min: 3, max: 20 })
        .matches(/^[a-zA-Z0-9_]+$/)
        .withMessage('Username must be 3-20 characters, alphanumeric and underscores only'),
      body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please provide a valid email address'),
      body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ error: 'Validation failed', details: errors.array()[0].msg });
      }

      return authController.register(req, res);
    }
  );

  // POST /api/login
  router.post(
    '/login',
    authLimiter,
    [body('username').notEmpty().withMessage('Username is required'), body('password').notEmpty().withMessage('Password is required')],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ error: 'Validation failed', details: errors.array()[0].msg });
      }

      return authController.login(req, res);
    }
  );

  return router;
};
