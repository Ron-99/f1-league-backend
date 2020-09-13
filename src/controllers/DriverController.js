'use strict';

const repository = require('../repositories/DriverRepository');
const teamRepository = require('../repositories/TeamRepository');
const rankRepository = require('../repositories/RankRepository');

module.exports = {
    async get(_, res){
        try{
            const drivers = await repository.get();
            res.status(200).send(drivers);
        }catch(e){
            res.status(400).send({
                message: 'Falha ao processar sua requisição'
            });
        }
    },

    async create(req, res){
        try{
            const team = await teamRepository.getById(req.body.idTeam);
            const rank = await rankRepository.getById(req.body.idRank);
            await repository.create({
                name: req.body.name,
                team: [team],
                rank: [rank]
            });
            res.status(201).send({
                message: 'Piloto criado com sucesso!'
            });
        }catch(e){
            console.log(e);
            res.status(400).send({
                message: 'Falha ao processar sua requisição'
            });
        }
    },

    async updateTeam(req, res){
        try{
            const team = await teamRepository.getById(req.body.idTeam);
            const driver = await repository.updateTeam(req.params.id, team);
            res.status(200).send({
                message: 'Piloto atualizado com sucesso!'
            });
        }catch(e){
            res.status(400).send({
                message: 'Falha ao processar sua requisição'
            });
        }
    }
}