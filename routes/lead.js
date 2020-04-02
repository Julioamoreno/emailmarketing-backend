const express = require('express');
const router = express.Router();
const leadController = require('../src/controllers/LeadsController');

router.get('/leads', leadController.show); //retornar varios

router.post('/leads', leadController.store); //adcionar

router.get('/leads/:id', leadController.showOne); //retornar um

router.put('/leads/:id', leadController.edit); //editar

router.delete('/leads/:id', leadController.delete); //deletar

module.exports = router;