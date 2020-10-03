'use strict';

const Penalty = require('../models/Penalty');

module.exports = {

    async get(){
        const penalties = await Penalty.find({}, 'level description color');
        return penalties;
    },

    async getByLevel(level){
        const penalty = await Penalty.findOne({level: level});
        return penalty;
    },

    async update(id, data){
        await Penalty.findByIdAndUpdate(id, data);
    },

    async create(data){
        await Penalty.create(data);
    }
}