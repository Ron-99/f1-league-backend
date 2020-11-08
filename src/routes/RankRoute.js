'use strict';

const express = require('express');
const router = express.Router();
const RankController = require('../controllers/RankController');

router.get('/', RankController.get);
router.get('/:id', RankController.getById);
router.get('/season/:id', RankController.getSeasons);
router.post('/', RankController.create);
router.post('/season/:id', RankController.createSeason);

module.exports = router;