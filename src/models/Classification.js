'use strict';

const mongoose = require('mongoose');

const ClassificationSchema = new mongoose.Schema({
    position: {
        type: Number,
        required: true
    },
    bestTime: {
        type: String,
        required: true
    },
    bestLap: {
        type: Boolean,
        default: false
    },
    trialTime:{
        type: String,
        required: true
    },
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Driver',
        required: true
    },
    rank: {
        type: String,
        required: true
    },
    season:{
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now()
    },
    points: {
        type: Number,
        required: true
    },
    track: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Track',
        required: true
    }    
});

module.exports = mongoose.model('Classification', ClassificationSchema);