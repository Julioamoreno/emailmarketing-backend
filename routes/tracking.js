const express = require('express');
const router = express.Router();
const TrackingController = require('../src/controllers/Tracking');

router.get('/campaign/tracking/open/:id/:leadid', TrackingController.open); 

router.get('/campaign/tracking/click/:id/:leadid', TrackingController.click);

module.exports = router;