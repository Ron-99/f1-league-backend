'use strict';

const repository = require('../repositories/RankRepository');

module.exports = {
    
    async get(_, res) {
        try{
            const ranks = await repository.get();
            res.status(200).send(ranks);
        }catch(e){
            console.error(e)
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
            console.error(e)
            res.status(400).send({
                message: 'Falha ao processar sua requisição'
            });
        }
    },

    async getSeasons(req, res){
        try{
            var {season} = await repository.getById(req.params.id);

            season.sort((a, b) => b.number - a.number)

            res.status(200).send(season);
        }catch(e){
            console.error(e)
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
            console.error(e);
        }
    },

    async createSeason(req, res){
        try{
            await repository.createSeason(req.params.id, {
                number: req.body.number,
                initialDate: req.body.initialDate,
                finalDate: req.body.finalDate
            });

            res.status(201).send({
                message: 'Temporada criada com sucesso!'
            });
        }catch(err){
            res.status(400).send({
                message: 'Falha ao processar sua requisição'
            });
            console.error(e);
        }
    }
}