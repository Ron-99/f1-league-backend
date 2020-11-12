'use strict';

const express = require('express');
const router = express.Router();

router.get('/', (_, res) => {
    res.status(200).send({
        title: 'API da e-racebrasil',
        description: 'Essa API tem como intuito a criação de ligas para corridas de vários jogos',
        version: '1.0.2',
        author: 'Ronaldo Gomes',
        github: 'github.com/ron-99',
        linkedin: 'https://www.linkedin.com/in/ron99/'
    });
});

module.exports = router;