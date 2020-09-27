'use strict';

const Team = require('../models/Team');

module.exports = {

    async get(){
        const teams = await Team.find({}, 'name colorTeam');
        return teams;
    },

    async getById(id){
        const team = await Team.findById(id);
        return team;
    },

    async create(data){
        await Team.create(data);
    }
}