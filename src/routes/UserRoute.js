'use strict';

const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.get('/', UserController.get);
router.post('/', UserController.create);

module.exports = router;