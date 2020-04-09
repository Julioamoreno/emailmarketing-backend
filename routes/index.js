const express = require('express');
const router = express.Router();
const passport = require('../src/auth/auth');

const campaign = require('./campaign');
const lead = require('./lead');
const list = require('./list');
 
router.get('/', (req, res) => {
  res.render('index', {title: 'express'})
});

//criando middleware para as rotas /api
router.use('/api', passport.authenticate('jwt', {session: false}));

router.use('/api', campaign);
router.use('/api', lead);
router.use('/api', list);


module.exports = router;