'use strict';

const Track = require('../models/Track');

module.exports = {

    async get(){
        const tracks = await Track
            .find({}, 'name flag')
            .collation({ locale: "en" })
            .sort({ name: 1 });
        return tracks;
    },
    
    async getById(id){
        const track = await Track.findById(id);
        return track;
    },

    async create(data){
        await Track.create(data);
    },

    async updateFlag(id, data, user, date){
        await Track.findOneAndUpdate({_id: id}, {flag: data, updatedBy: user, updated: date})
    }
}