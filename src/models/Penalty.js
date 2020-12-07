'use strict';

const mongoose = require('mongoose');

const PenaltySchema = new mongoose.Schema({
    level: {
        type: Number,
        required: true
    },
    description:{
        type: String,
        required: false
    },
    color:{
        type: String,
        required: true,
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

module.exports = mongoose.model('Penalty', PenaltySchema);