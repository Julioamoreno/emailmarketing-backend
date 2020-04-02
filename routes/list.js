const express = require('express');
const router = express.Router();
const list = require('../src/controllers/ListsController');

router.get('/lists', list.show); //retornar lista

router.post('/lists', list.store); //adcionar

router.get('/lists/:id', list.showOne); //retornar um

router.put('/lists/:id', list.edit); //editar 

router.delete('/lists/:id', list.delete); //deletar

module.exports = router;