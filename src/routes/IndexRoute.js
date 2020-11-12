'use strict';

const express = require('express');
const router = express.Router();

router.get('/', (_, res) => {
    res.status(200).send({
        title: 'API da Liga do Brasil',
        version: '1.0.2',
        author: 'Ronaldo Gomes',
        github: 'github.com/ron-99'
    });
});

module.exports = router;