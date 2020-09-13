'use strict';

const express = require('express');
const mongoose = require('mongoose');
const requireDir = require('require-dir');

require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

const app = express();
app.use(express.json());

// Connect to database
mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

// Load Models 
requireDir('./models');

// Load Routes
const indexRoute = require('./routes/IndexRoute');
const userRoute = require('./routes/UserRoute');
const teamRoute = require('./routes/TeamRoute');
const driverRoute = require('./routes/DriverRoute');

// Enable CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    next();
});

app.use('/', indexRoute);
app.use('/user', userRoute);
app.use('/team', teamRoute);
app.use('/driver', driverRoute);

module.exports = app;