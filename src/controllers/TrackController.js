'use strict';

const repository = require('../repositories/TrackRepository');

module.exports = {
    
    async get(_, res) {
        try{
            const tracks = await repository.get();
            res.status(200).send(tracks);
        }catch(e){
            res.status(400).send({
                message: 'Falha ao processar sua requisição'
            });
        }
    },

    async create(req, res){
        try{
            await repository.create({
                name: req.body.name
            });
            res.status(201).send({
                message: 'Pista criada com sucesso!'
            });
        }catch(e){
            res.status(400).send({
                message: 'Falha ao processar sua requisição'
            });
        }
    }
}