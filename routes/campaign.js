const express = require('express');
const router = express.Router();
const CampaignController = require('../src/controllers/CampaignController');

router.get('/campaign/email-render/:id', CampaignController.renderEmail); //renderiza

router.get('/campaign/in-browser/:id/:leadid', CampaignController.inrenderEmail); //renderiza web

router.get('/api/campaign', CampaignController.show); //retornar lista

router.post('/api/campaign', CampaignController.store); //adcionar

router.get('/api/campaign/:id', CampaignController.showOne); //retornar um

router.put('/api/campaign/:id', CampaignController.edit); //editar

router.delete('/api/campaign/:id', CampaignController.delete); //deletar

module.exports = router;