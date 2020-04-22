const express = require('express');
const router = express.Router();
const leadController = require('../src/controllers/LeadsController');

const { check } = require('express-validator');

router.post('/leads/subscribe',[
    check('email','não é um email').isEmail().normalizeEmail(),
    check('list','Lista é um campo obrigatorio.').exists()
  ], leadController.subscribe);

router.get('/api/leads', leadController.show); //retornar varios

router.post('/api/leads', leadController.store); //adcionar

router.get('/api/leads/:id', leadController.showOne); //retornar um

router.get('/api/leadsbylist/:id', leadController.leadsByList); //retornar um

router.put('/api/leads/:id', leadController.edit); //editar

router.delete('/api/leads/:id', leadController.delete); //deletar

module.exports = router;