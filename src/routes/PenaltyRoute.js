'use strict';

const express = require('express');
const router = express.Router();
const PenaltyController = require('../controllers/PenaltyController');
const authService = require('../services/AuthService');

router.get('/', PenaltyController.get);
router.post('/', authService.authorize, PenaltyController.create);
router.put('/:id', authService.authorize, PenaltyController.update);

module.exports = router;