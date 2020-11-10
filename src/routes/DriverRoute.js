'use strict';

const express = require('express');
const router = express.Router();
const DriverController = require('../controllers/DriverController');
const authService = require('../services/AuthService');

router.get('/', DriverController.get);
router.get('/drivers', DriverController.getByName);
router.get('/wins/:id', DriverController.getWins);
router.get('/races/:id', DriverController.getRaces);
router.get('/:id', DriverController.getById);
router.post('/', authService.authorize, DriverController.create);
router.put('/team/:id', authService.authorize, DriverController.updateTeam);
router.put('/penalty/:id', authService.authorize, DriverController.updatePenalty);

module.exports = router;