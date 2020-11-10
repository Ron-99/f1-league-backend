'use strict';

const express = require('express');
const router = express.Router();
const RankController = require('../controllers/RankController');
const authService = require('../services/AuthService');

router.get('/', RankController.get);
router.get('/:id', RankController.getById);
router.get('/season/:id', RankController.getSeasons);
router.post('/', authService.authorize, RankController.create);
router.post('/season/:id', authService.authorize, RankController.createSeason);

module.exports = router;