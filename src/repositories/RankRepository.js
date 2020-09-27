'use strict';

const Rank = require('../models/Rank');

module.exports = {

    async get(){
        const ranks = await Rank.find({}, 'name season');
        return ranks;
    },

    async getById(id){
        const rank = await Rank.findById(id);
        return rank;
    },

    async create(data){
        await Rank.create(data);
    }

}