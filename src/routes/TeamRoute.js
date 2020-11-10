'use strict';

const express = require('express');
const router = express.Router();
const TeamController = require('../controllers/TeamController');
const authService = require('../services/AuthService');

router.get('/', TeamController.get);
router.post('/', authService.authorize, TeamController.create);
router.put('/:id', authService.authorize, TeamController.update);

module.exports = router;