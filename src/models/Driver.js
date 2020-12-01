'use strict';

const mongoose = require('mongoose');

const DriverSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    team: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        required: true
    }],
    rank: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rank',
        required: true
    }],
    penalty: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Penalty',
        required: true
    },
    created: {
        type: Date,
        default: Date.now()
    },
    updated: {
        type: Date,
        default: Date.now()
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    }
});

module.exports = mongoose.model('Driver', DriverSchema);