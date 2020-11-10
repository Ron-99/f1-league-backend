'use strict';

const express = require('express');
const router = express.Router();
const ClassificationController = require('../controllers/ClassificationController');
const authService = require('../services/AuthService');

router.get('/', ClassificationController.get);
router.get('/dates', ClassificationController.getDate);
router.get('/drivers-points', ClassificationController.getDriversPoints);
router.get('/team-points', ClassificationController.getTeamPoints);
router.post('/', authService.authorize, ClassificationController.create);
router.put('/:id', authService.authorize, ClassificationController.update);
router.delete('/:id', authService.authorize, ClassificationController.delete);

module.exports = router;