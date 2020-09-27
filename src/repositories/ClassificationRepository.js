'use strict';

const Classification = require('../models/Classification');

module.exports = {
    async get(date, rank){
        const ratings = await Classification
            .find({
                "date": {
                    "$eq": new Date(date)
                },
                "rank": {
                    "$eq": rank
                }
            }, 'position driver rank date points track bestTime trialTime bestLap season')
            .populate('track', 'name flag')
            .populate('driver', 'name')
            .populate({
                path: 'driver',
                select: 'name',
                populate: {
                    path: 'team',
                    select: 'name colorTeam'
                }
            })
            .sort('position');

        return ratings;
    },

    async getDate(rank){
        const dates = await Classification
            .find({
                'rank': {
                    '$eq': rank
                }
            }, 'date')
            .sort('date')
            .distinct('date')
            

        return dates;
    },

    async create(data){
        await Classification.create(data);
    },

    async update(id, data){
        await Classification.findOneAndUpdate({_id: id}, data)
    },
    
    async delete(id){
        await Classification.findOneAndRemove({_id: id});
    }

}