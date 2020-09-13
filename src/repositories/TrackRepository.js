'use strict';

const Track = require('../models/Track');

module.exports = {

    async get(){
        const tracks = await Track.find({}, 'name');
        return tracks;
    },

    async create(data){
        await Track.create(data);
    }

}