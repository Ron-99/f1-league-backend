'use strict';

const express = require('express');
const router = express.Router();
const TrackController = require('../controllers/TrackController');

router.get('/', TrackController.get);
router.post('/', TrackController.create);

module.exports = router;