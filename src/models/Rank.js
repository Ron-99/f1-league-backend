'use strict';

const mongoose = require('mongoose');

const RankSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    season: [{
        number: {
            type: Number,
            required: true
        },
        initialDate: {
            type: Date,
            default: Date.now()
        },
        finalDate: {
            type: Date,
            required: true
        }
    }],
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

module.exports = mongoose.model('Rank', RankSchema);