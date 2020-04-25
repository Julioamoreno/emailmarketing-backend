const express = require('express');
const router = express.Router();
const passport = require('../src/auth/auth');

const users = require('./users');
const campaign = require('./campaign');
const lead = require('./lead');
const list = require('./list');
const tracking = require('./tracking');
 
router.get('/', (req, res) => {
  res.render('index', {title: 'express'})
});

router.use('/users', users);
router.use(tracking);

//criando middleware para as rotas /api
router.use('/api', passport.authenticate('jwt', {session: false}));

router.use('/api', campaign);
router.use(lead);
router.use('/api', list);


module.exports = router;