'use strict';

const Track = require('../models/Track');

module.exports = {

    async get(){
        const tracks = await Track.find({}, 'name flag').sort('name');
        return tracks;
    },
    
    async getById(id){
        const track = await Track.findById(id);
        return track;
    },

    async create(data){
        await Track.create(data);
    },

    async updateFlag(id, data){
        await Track.findOneAndUpdate({_id: id}, {flag: data})
    }

}