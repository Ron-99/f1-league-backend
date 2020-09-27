'use strict';

const express = require('express');
const router = express.Router();
const TeamController = require('../controllers/TeamController');

router.get('/', TeamController.get);
router.post('/', TeamController.create);

module.exports = router;