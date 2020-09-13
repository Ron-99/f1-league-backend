'use strict';

const User = require('../models/User');

module.exports = {

    async get(){
        const user = await User.find({}, 'name email');
        return user;
    },

    async create(data){
        await User.create(data);
    }

}