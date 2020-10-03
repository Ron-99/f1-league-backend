'use strict';

const Driver = require('../models/Driver');
const Classification = require('../models/Classification');

module.exports = {
    async get(){
        const drivers = await Driver
            .find({}, 'name team')
            .populate('team', 'name')
            .populate('rank', 'name')
        return drivers;
    },

    async getByName(name){
        const drivers = await Driver
            .find({name: { $regex: new RegExp(name), $options: 'i' }}, 'name team')
            .populate('team', 'name')
            .populate('rank', 'name')
            .collation({ locale: "en" })
            .sort({ name: 1 });
        return drivers;
    },

    async getById(id){
        const driver = await Driver
            .findById(id, 'name team penalty')
            .populate('team', 'name')
            .populate('rank', 'name')
            .populate('penalty', 'level description color');;
            
        return driver;
    },

    async getWins(id){
        const driver = await this.getById(id);
        const wins = await Classification
            .find({driver: driver}, 'position');

        return wins;
    },

    async getRecentRaces(id){
        const driver = await this.getById(id);
        const races = await Classification
            .find({driver: driver}, 'position rank date points track bestTime trialTime bestLap season')
            .populate('track', 'name flag')
            .sort({date: 'desc'});
        return races;
    },

    async create(data){
        await Driver.create(data);
    },

    async updatePenalty(id, data){
        await Driver.findByIdAndUpdate(id, {penalty: data});
    },

    async updateTeam(id, data){
        const driver = await Driver.findOneAndUpdate({_id: id}, { $push: { team: data}});
        return driver;
    }
}