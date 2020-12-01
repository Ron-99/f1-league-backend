'use strict';

const repository = require('../repositories/ClassificationRepository');
const driverRepository = require('../repositories/DriverRepository');
const trackRepository = require('../repositories/TrackRepository');
const rankRepository = require('../repositories/RankRepository');
const teamRepository = require('../repositories/TeamRepository');
const userRepository = require('../repositories/UserRepository');

module.exports = {
    async get(req, res){
        try{
            const ratings = await repository.get(req.query.date, req.query.rank, req.query.season);

            let times = [];
            ratings.forEach((rating) => {
                const time = parseInt(rating.bestTime.replace(':', '').replace(',', ''));
                const data = time
                

                if(!isNaN(data))
                    times.push(Math.min(data))
            })
            Array.min = function(array) {
                return Math.min.apply(Math, array);
            };

            String.prototype.splice = function(idx, rem, str) {
                return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
            };



            const best_time = Array.min(times).toString().splice(1, 0, ":").splice(4, 0, ",");

            ratings.forEach((rating, i) => {
                if(rating.bestTime === best_time){
                    rating.bestLap = true;
                    return;
                }
            })

            res.status(200).send(ratings);
        }catch(e){
            console.error(e);
            res.status(400).send({
                message: 'Falha ao processar sua requisição'
            });
        }
    },

    async getDate(req, res){
        try{
            const dates = await repository.getDate(req.query.rank);
            res.status(200).send(dates);
        }catch(e){
            res.status(400).send({
                message: 'Falha ao processar sua requisição'
            });
        }
    },

    async getDriversPoints(req, res){
        try{
            const driversPoints = await repository.getDriversPoints(req.query.rank, parseInt(req.query.season));
            res.status(200).send(driversPoints); 
        }catch(e){
            console.error(e);
            res.status(400).send({
                message: 'Falha ao processar sua requisição'
            });
        }
    },

    async getTeamPoints(req, res){
        try{
            const driversPoints = await repository.getDriversPoints(req.query.rank, parseInt(req.query.season));
            const teams = await teamRepository.get();

            const teamPoints = []

            function compare(a, b) {
                const pointsA = a.points;
                const pointsB = b.points;
              
                let comparison = 0;
                if (pointsA < pointsB) {
                  comparison = 1;
                } else if (pointsA > pointsB) {
                  comparison = -1;
                }
                return comparison;
              }
              


            teams.forEach((team) => {      
                let driver = {
                    _id: "",
                    team: "",
                    drivers: "",
                    points: 0
                }
                let i = 0;    
                driversPoints.forEach((driverPoints) => {
                    
                    if(team.name === driverPoints._id.team[0].name && req.query.rank === driverPoints._id.rank[0].name){
                        driver._id = team._id;
                        driver.team = team.name;
                        driver.drivers += driverPoints._id.name + (i === 0 ? ', ' : '');
                        driver.points += driverPoints.points;
                        i++;
                    }
                }) 
                if(driver.team !== "")
                    teamPoints.push(driver);               
            })

            teamPoints.sort(compare);

            res.status(200).send(teamPoints); 
        }catch(e){
            console.error(e);
            res.status(400).send({
                message: 'Falha ao processar sua requisição'
            });
        }
    },

    async create(req, res){
        try{
            const driver = await driverRepository.getById(req.body.idDriver);
            const track = await trackRepository.getById(req.body.idTrack);
            const rank =  await rankRepository.getById(driver.rank[driver.rank.length-1]);
            const user = await userRepository.getByEmail(req.header('emailUser'));
            
            await repository.create({
                position: req.body.position,
                date: req.body.date,
                points: req.body.points,
                driver: driver,
                rank: rank.name,
                track: track,
                bestTime: req.body.bestTime,
                trialTime: req.body.trialTime,
                season: rank.season[rank.season.length-1].number,
                createdBy: user,
                updatedBy: user
            }); 
            res.status(201).send({
                message: 'Classificação criada com sucesso!'
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
            const driver = await driverRepository.getById(req.body.idDriver);
            const track = await trackRepository.getById(req.body.idTrack);
            const user = await userRepository.getByEmail(req.header('emailUser'));
            console.log(req.header('emailUser'));
            console.log(user)
            
            await repository.update(req.params.id,{
                position: req.body.position,
                date: req.body.date,
                points: req.body.points,
                driver: driver,
                track: track,
                bestTime: req.body.bestTime,
                trialTime: req.body.trialTime,
                updatedBy: user
            });
            res.status(200).send({
                message: 'Classificação atualizada com sucesso!'
            });
        }catch(e){
            console.error(e);
            res.status(400).send({
                message: 'Falha ao processar sua requisição'
            });
        }
    },

    async delete(req, res){
        try{
            await repository.delete(req.params.id);
            res.status(200).send({
                message: 'Classificação removido com sucesso!'
            });
        }catch(e){
            res.status(400).send({
                message: 'Falha ao processar sua requisição'
            });
        }
    }

}