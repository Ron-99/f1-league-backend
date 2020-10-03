'use strict';

const express = require('express');
const router = express.Router();
const PenaltyController = require('../controllers/PenaltyController');

router.get('/', PenaltyController.get);
router.post('/', PenaltyController.create);
router.put('/:id', PenaltyController.update);

module.exports = router;