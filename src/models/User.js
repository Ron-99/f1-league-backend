'use strict';

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Driver'
    },
    roles: [{
        type: String,
        required: true,
        enum: ['user', 'admin'],
        default: 'user'
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

module.exports = mongoose.model('User', UserSchema);