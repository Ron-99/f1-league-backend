'use strict';

const express = require('express');
const router = express.Router();
const ClassificationController = require('../controllers/ClassificationController');

router.get('/', ClassificationController.get);
router.get('/dates', ClassificationController.getDate);
router.get('/drivers-points', ClassificationController.getDriversPoints);
router.get('/team-points', ClassificationController.getTeamPoints);
router.post('/', ClassificationController.create);
router.put('/:id', ClassificationController.update);
router.delete('/:id', ClassificationController.delete);

module.exports = router;