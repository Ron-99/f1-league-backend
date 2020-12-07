'use strict';

const repository = require('../repositories/TeamRepository');
const userRepository = require('../repositories/UserRepository');

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

    async getById(req, res){
        try{
            const team = await repository.getById(req.params.id);
            res.status(200).send(team);
        }catch(e){
            res.status(400).send({
                message: 'Falha ao processar sua requisição'
            });
        }
    },

    async create(req, res){
        try{
            const user = await userRepository.getByEmail(req.header('emailUser'));
            const team = await repository.create({
                name: req.body.name,
                createdBy: user,
                updatedBy: user
            });
            res.status(201).send({
                data: team,
                message: 'Time criado com sucesso!'
            });
        }catch(e){
            console.error(e);
            res.status(400).send({
                message: 'Falha ao processar sua requisição'
            });
        }
    },

    async update(req, res){
        try{
            const user = await userRepository.getByEmail(req.header('emailUser'));
            await repository.update(req.params.id, {
                name: req.query.name,
                updatedBy: user,
                updated: Date.now()
            });
            res.status(200).send({
                message: 'Time atualizado com sucesso!'
            });
        }catch(e){
            console.error(e);
            res.status(400).send({
                message: 'Falha ao processar sua requisição'
            });
        }
    }
}