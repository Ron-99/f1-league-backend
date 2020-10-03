'use strict';

const express = require('express');
const router = express.Router();
const DriverController = require('../controllers/DriverController');

router.get('/', DriverController.get);
router.get('/drivers', DriverController.getByName);
router.get('/wins/:id', DriverController.getWins);
router.get('/races/:id', DriverController.getRaces);
router.get('/:id', DriverController.getById);
router.post('/', DriverController.create);
router.put('/team/:id', DriverController.updateTeam);
router.put('/penalty/:id', DriverController.updatePenalty);

module.exports = router;