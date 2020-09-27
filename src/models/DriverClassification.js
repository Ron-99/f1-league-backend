'use strict';

const mongoose = require('mongoose');

const DriverClassificationSchema = new mongoose.Schema({
    position: {
        type: Number,
        required: true
    },
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Driver',
        required: true
    },
    points: {
        type: Number,
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
});

module.exports = mongoose.model('DriverClassification', DriverClassificationSchema);