const auth = require('express').Router();
const passport = require('passport');
const authController = require('../util/auth_controller');

/**Google Route */
auth.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
auth.get('/google/redirect', authController.google);

/**42 Route */
auth.get('/42', passport.authenticate('42', { session: false }));
auth.get('/42/redirect', authController.fortytwo);

module.exports = auth;