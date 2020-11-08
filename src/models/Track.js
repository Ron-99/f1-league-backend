'use strict';

const mongoose = require('mongoose');

const TrackSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Track', TrackSchema);