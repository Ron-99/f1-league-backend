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
    }
});

module.exports = mongoose.model('Rank', RankSchema);