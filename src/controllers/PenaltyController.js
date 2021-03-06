'use strict';

const repository = require('../repositories/PenaltyRepository');
const userRepository = require('../repositories/UserRepository');

module.exports = {
    async get(_, res){
        try{
            const penalties = await repository.get();
            res.status(200).send(penalties);
        }catch(e){
            res.status(400).send({
                message: 'Falha ao processar sua requisição'
            });
        }
    },

    async update(req, res){
        try{
            const user = await userRepository.getByEmail(req.header('emailUser'));
            await repository.update(req.params.id, {
                level: req.body.level,
                description: req.body.description,
                color: req.body.color,
                updatedBy: user,
                updated: Date.now()
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
            const user = await userRepository.getByEmail(req.header('emailUser'));
            await repository.create({
                level: req.body.level,
                description: req.body.description,
                color: req.body.color,
                createdBy: user,
                updatedBy: user
            });
            res.status(201).send({
                message: 'Penalidade criada com sucesso!'
            });
        }catch(e){
            console.error(e);
            res.status(400).send({
                message: 'Falha ao processar sua requisição'
            });
        }
    }
}