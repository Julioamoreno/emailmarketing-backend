var express = require('express');
var router = express.Router();

var campaign = require('./campaign');
var lead = require('./lead');
var list = require('./list');
 
router.get('/', (req, res) => {
  res.render('index', {title: 'express'})
});

router.use('/api', campaign);
router.use('/api', lead);
router.use('/api', list);


module.exports = router;