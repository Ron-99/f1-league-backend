'use strict';

const Driver = require('../models/Driver');

module.exports = {
    async get(){
        const drivers = await Driver
            .find({}, 'name team')
            .populate('team', 'name');
        return drivers;
    },

    async create(data){
        await Driver.create(data);
    },

    async updateTeam(id, data){
        const driver = await Driver.findOneAndUpdate({_id: id}, { $push: { team: data}});
        return driver;
    }
}