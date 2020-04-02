const express = require('express');
const router = express.Router();
const CampaignController = require('../src/controllers/CampaignController');

router.get('/campaign', CampaignController.show); //retornar lista

router.post('/campaign', CampaignController.store); //adcionar

router.get('/campaign/:id', CampaignController.showOne); //retornar um

router.put('/campaign/:id', CampaignController.edit); //editar

router.delete('/campaign/:id', CampaignController.delete); //deletar

module.exports = router;