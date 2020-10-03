'use strict';

const repository = require('../repositories/PenaltyRepository');

module.exports = {
    async get(_, res){
        try{
            const penalties = await repository.get();
            console.log(penalties)
            res.status(200).send(penalties);
        }catch(e){
            res.status(400).send({
                message: 'Falha ao processar sua requisição'
            });
        }
    },

    async update(req, res){
        try{
            await repository.update(req.params.id, {
                level: req.body.level,
                description: req.body.description,
                color: req.body.color
            });
            res.status(200).send({
                message: 'Penalidade atualizada com sucesso!'
            });
        }catch(e){
            res.status(400).send({
                message: 'Falha ao processar sua requisição'
            });
        }
    },

    async create(req, res) {
        try{
            await repository.create({
                level: req.body.level,
                description: req.body.description
            });
            res.status(201).send({
                message: 'Penalidade criada com sucesso!'
            });
        }catch(e){
            console.log(e);
            res.status(400).send({
                message: 'Falha ao processar sua requisição'
            });
        }
    }
}