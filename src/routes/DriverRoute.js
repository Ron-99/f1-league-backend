'use strict';

const express = require('express');
const router = express.Router();
const DriverController = require('../controllers/DriverController');

router.get('/', DriverController.get);
router.post('/', DriverController.create);
router.put('/:id', DriverController.updateTeam);

module.exports = router;