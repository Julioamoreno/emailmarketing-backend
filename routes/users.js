const express = require('express');
const router = express.Router();
const user = require('../src/controllers/UserController');

const passport = require('../src/auth/auth');

router.post('/token', user.auth);

router.get('/me', passport.authenticate('jwt', {session: false}), user.search);

router.post('/register', user.store);

module.exports = router;
