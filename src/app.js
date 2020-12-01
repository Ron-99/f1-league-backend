'use strict';

const express = require('express');
const mongoose = require('mongoose');
const requireDir = require('require-dir');

require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

const { DB_USER, DB_PASS, DB_HOST, DB_PORT, DB_NAME } = process.env

const app = express();
app.use(express.json());

// Connect to database
mongoose.connect(`mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

mongoose.connection.once('open', () => console.log('database connected'));
mongoose.connection.on('error', () => console.error('database error:'));

// Load Models 
requireDir('./models');

// Load Routes
const indexRoute = require('./routes/IndexRoute');
const userRoute = require('./routes/UserRoute');
const teamRoute = require('./routes/TeamRoute');
const driverRoute = require('./routes/DriverRoute');
const rankRoute = require('./routes/RankRoute');
const trackRoute = require('./routes/TrackRoute');
const classificationRoute = require('./routes/ClassificationRoute');
const penaltyRoute = require('./routes/PenaltyRoute');

// Enable CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token, emailUser');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    next();
});

app.use('/', indexRoute);
app.use('/user', userRoute);
app.use('/team', teamRoute);
app.use('/driver', driverRoute);
app.use('/rank', rankRoute);
app.use('/track', trackRoute);
app.use('/classification', classificationRoute);
app.use('/penalty', penaltyRoute);

module.exports = app;