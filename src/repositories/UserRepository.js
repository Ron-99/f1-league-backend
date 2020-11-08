'use strict';

const User = require('../models/User');

module.exports = {

    async get(){
        const users = await User.find({}, 'name email driver role');
        return users;
    },

    async create(data){
        await User.create(data);
    },

    async authenticate(data){
        const res = await User.findOne({
            email: data.email,
            password: data.password
        });

        return res;
    }

}