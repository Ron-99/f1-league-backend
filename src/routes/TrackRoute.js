'use strict';

const express = require('express');
const router = express.Router();
const TrackController = require('../controllers/TrackController');
const authService = require('../services/AuthService');

router.get('/', TrackController.get);
router.post('/', authService.authorize, TrackController.create);
router.put('/:id', authService.authorize, TrackController.update);

module.exports = router;