'use strict';

const repository = require('../repositories/RankRepository');

module.exports = {
    
    async get(_, res) {
        try{
            const ranks = await repository.get();
            res.status(200).send(ranks);
        }catch(e){
            res.status(400).send({
                message: 'Falha ao processar sua requisição'
            });
        }
    },

    async getById(req, res) {
        try{
            const rank = await repository.getById(req.params.id);
            res.status(200).send(rank);
        }catch(e){
            res.status(400).send({
                message: 'Falha ao processar sua requisição'
            });
        }
    },

    async create(req, res){
        try{
            await repository.create({
                name: req.body.name,
                season: [{
                    number: req.body.season.number,
                    initialDate: req.body.season.initialDate,
                    finalDate: req.body.season.finalDate
                }]
            });
            res.status(201).send({
                message: 'Liga criada com sucesso!'
            });
        }catch(e){
            res.status(400).send({
                message: 'Falha ao processar sua requisição'
            });
            console.log(e);
        }
    }
}