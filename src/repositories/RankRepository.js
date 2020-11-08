'use strict';

const Rank = require('../models/Rank');

module.exports = {

    async get(){
        const ranks = await Rank.find({}, 'name season').collation({ locale: "en" })
        .sort({ name: 1 });
        return ranks;
    },

    async getById(id){
        const rank = await Rank.findById(id);
        return rank;
    },

    async create(data){
        await Rank.create(data);
    },

    async createSeason(id, data){
        await Rank.findOneAndUpdate({_id: id}, { $push: { season: data}});
    }

}