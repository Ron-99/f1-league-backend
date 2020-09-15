'use strict';

const Driver = require('../models/Driver');

module.exports = {
    async get(){
        const drivers = await Driver
            .find({}, 'name team')
            .populate('team', 'name')
            .populate('rank', 'name');
        return drivers;
    },

    async getById(id){
        const driver = await Driver.findById(id);
        return driver;
    },

    async create(data){
        await Driver.create(data);
    },

    async updateTeam(id, data){
        const driver = await Driver.findOneAndUpdate({_id: id}, { $push: { team: data}});
        return driver;
    }
}