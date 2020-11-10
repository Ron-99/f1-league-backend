'use strict';

const User = require('../models/User');

module.exports = {

    async get(){
        const users = await User.find({}, 'name email driver roles');
        return users;
    },

    async getById(id){
        const user = await User.findById(id);
        return user;
    },

    async getByEmail(email){
        const user = await User.findOne({email: email});
        return user;
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