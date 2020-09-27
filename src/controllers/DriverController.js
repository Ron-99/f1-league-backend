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

    async getByName(req, res){
        try{
            const drivers = await repository.getByName(req.query.name);
            res.status(200).send(drivers);
        }catch(e){
            res.status(400).send({
                message: 'Falha ao processar sua requisição'
            });
        }
    },

    async getById(req, res){
        try{
            const driver = await repository.getById(req.params.id);
            res.status(200).send(driver);
        }catch(e){
            res.status(400).send({
                message: 'Falha ao processar sua requisição'
            });
        }
    },

    async getWins(req, res){
        try{
            const wins = await repository.getWins(req.params.id);
            let trophys = {
                first: 0,
                second: 0,
                third: 0
            };
            wins.map(win => {
                if(win.position === 1)
                    trophys.first += 1;
                
                if(win.position === 2)
                    trophys.second += 1;

                if(win.position === 3)
                    trophys.third += 1;
            })
            res.status(200).send(trophys);
        }catch(e){
            console.log(e);
            res.status(400).send({
                message: 'Falha ao processar sua requisição'
            });
        }
    },

    async getRaces(req, res){
        try{
            const races = await repository.getRecentRaces(req.params.id);
            res.status(200).send(races);
        }catch(e){
            console.log(e);
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