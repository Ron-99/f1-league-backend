'use strict';

const repository = require('../repositories/TrackRepository');
const userRepository = require('../repositories/UserRepository');

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
            const user = await userRepository.getByEmail(req.header('emailUser'));
            await repository.create({
                name: req.body.name,
                createdBy: user,
                updatedBy: user
                
            });
            res.status(201).send({
                message: 'Pista criada com sucesso!'
            });
        }catch(e){
            res.status(400).send({
                message: 'Falha ao processar sua requisição'
            });
        }
    },

    async update(req, res){
        try{
            const user = await userRepository.getByEmail(req.header('emailUser'));
            await repository.updateFlag(req.params.id, req.body.flag, user, Date.now());
            res.status(200).send({
                message: 'Pista atualizada com sucesso!'
            });
        }catch(e){
            res.status(400).send({
                message: 'Falha ao processar sua requisição'
            });
        }
    }
}