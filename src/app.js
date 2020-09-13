'use strict';

const express = require('express');


const app = express();
app.use(express.json());

// Load Routes
const indexRoute = require('./routes/IndexRoute');

// Enable CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    next();
});

app.use('/', indexRoute);

module.exports = app;