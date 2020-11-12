'use strict';

const Team = require('../models/Team');

module.exports = {

    async get(name){
        const teams = await Team
            .find({name: { $regex: new RegExp(name), $options: 'i' }}, 'name colorTeam')
            .collation({ locale: "en" })
            .sort({ name: 1 });
        return teams;
    },

    async getById(id){
        const team = await Team.findById(id);
        return team;
    },

    async create(data){
        const team = await Team.create(data);
        return team;
    },
    
    async update(id, data){
        await Team.findByIdAndUpdate(id, data);
    }
}