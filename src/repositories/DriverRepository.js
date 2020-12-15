'use strict';

const Driver = require('../models/Driver');
const Classification = require('../models/Classification');

module.exports = {
    async get(){
        const drivers = await Driver
            .find({}, 'name team createdBy updatedBy')
            .populate('team', 'name')
            .populate('rank', 'name')
            .populate('createdBy', 'name')
            .populate('updatedBy', 'name')
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

    async getWins(id, name){
        let driver;
        if(!!id)
            driver = await this.getById(id);
        else{
            driver = await this.getByName(name);
            driver = driver[0];
        }
        const wins = await Classification
            .find({driver: driver}, 'position');

        return wins;
    },

    async getRecentRaces(id, name){
        
        let driver;
        if(!!id)
            driver = await this.getById(id);
        else{
            driver = await this.getByName(name);
            driver = driver[0];
        }
                    
        const races = await Classification
            .find({driver: driver}, 'position rank date points track bestTime trialTime bestLap season')
            .populate('track', 'name flag')
            .sort({date: 'desc'});
        return races;
    },

    async create(data){
        await Driver.create(data);
    },

    async updatePenalty(id, data, user, date){
        await Driver.findByIdAndUpdate(id, {updated: date, penalty: data, updatedBy: user});
    },

    async updateTeam(id, data, user, date ){
        const driver = await Driver.findOneAndUpdate({_id: id}, {updated: date, updatedBy: user, $push: { team: data} });
        return driver;
    }
}