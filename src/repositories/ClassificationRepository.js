'use strict';

const Classification = require('../models/Classification');
const Driver = require('../models/Driver');

module.exports = {
    async get(date, rank, season){
        const ratings = await Classification
            .find({
                "date": {
                    "$eq": new Date(date)
                },
                "rank": {
                    "$eq": rank
                },
                "season": {
                    "$eq": season
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

    async getDriversPoints(rank, season){
        const driversPoints = await Classification
            .aggregate(
                [
                    { 
                        $match : { 
                            rank: rank,
                            season: season
                        } 
                    },
                    {
                        $group: {
                            _id: "$driver",
                            points: {
                                $sum: '$points'
                            }
                        }                        
                    }
                ]
            ).sort({points: 'desc'})
        await Driver
            .populate(driversPoints, 
                {
                    path: '_id',
                    populate: [{
                        path: 'team',
                        select: 'name'
                    },
                    {
                        path: 'rank', 
                        select: 'name season'
                    }]
                })
            
            
        return driversPoints;
    },

    async getTeamPoints(){
        const teamPoints = await Classification.aggregate(
            [
                { 
                    $group : { 
                        _id : '$driver', 
                        points : { 
                            $sum : "$points"
                        }
                    }
                }
            ]
        );
        
        return teamPoints;

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