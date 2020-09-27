'use strict';

const express = require('express');
const router = express.Router();
const RankController = require('../controllers/RankController');

router.get('/', RankController.get);
router.post('/', RankController.create);

module.exports = router;