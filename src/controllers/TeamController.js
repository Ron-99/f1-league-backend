'use strict';

const repository = require('../repositories/TeamRepository');

module.exports = {

    async get(req, res){
        try{
            const teams = await repository.get(req.query.name);
            res.status(200).send(teams);
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
                colorTeam: req.body.colorTeam
            });
            res.status(201).send({
                message: 'Time criado com sucesso!'
            });
        }catch(e){
            res.status(400).send({
                message: 'Falha ao processar sua requisição'
            });
        }
    }
}