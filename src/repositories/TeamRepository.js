'use strict';

const Team = require('../models/Team');

module.exports = {

    async get(){
        const teams = await Team.find({}, 'name');
        return teams;
    },

    async create(data){
        await Team.create(data);
    }
}