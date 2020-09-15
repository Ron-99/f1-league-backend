'use strict';

const repository = require('../repositories/ClassificationRepository');
const driverRepository = require('../repositories/DriverRepository');
const trackRepository = require('../repositories/TrackRepository');
const rankRepository = require('../repositories/RankRepository');

module.exports = {
    async get(req, res){
        try{
            const ratings = await repository.get(req.query.date, req.query.rank);

            let times = [];
            ratings.forEach((rating, i) => {
                const time = parseInt(rating.bestTime.replace(':', '').replace(',', ''));
                const data = time
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

    async create(req, res){
        try{
            const driver = await driverRepository.getById(req.body.idDriver);
            const track = await trackRepository.getById(req.body.idTrack);
            const rank =  await rankRepository.getById(driver.rank[driver.rank.length-1]);
            
            await repository.create({
                position: req.body.position,
                date: req.body.date,
                points: req.body.points,
                driver: driver,
                rank: rank.name,
                track: track,
                bestTime: req.body.bestTime,
                trialTime: req.body.trialTime,
                season: rank.season[rank.season.length-1].number
            });
            res.status(201).send({
                message: 'Classificação criado com sucesso!'
            });
        }catch(e){
            console.log(e);
            res.status(400).send({
                message: 'Falha ao processar sua requisição'
            });
        }
    },

    async delete(req, res){
        try{
            await repository.delete(req.body.id);
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