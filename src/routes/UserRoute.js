'use strict';

const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const authService = require('../services/AuthService');

router.get('/', UserController.get);
router.post('/', UserController.create);
router.post('/login', UserController.authenticate);
router.post('/refresh-token', authService.authorize,UserController.refreshToken);

module.exports = router;