'use strict';

const repository = require('../repositories/UserRepository');
const driverRepository = require('../repositories/DriverRepository');
const md5 = require('md5');
const authService = require('../services/AuthService');

module.exports = {
    
    async get(_, res) {
        try{
            const users = await repository.get();
            res.status(200).send(users);
        }catch(e){
            res.status(400).send({
                message: 'Falha ao processar sua requisição'
            });
        }
    },

    async create(req, res){
        try{
            // const driver = await driverRepository.getById(req.body.idDriver);

            const user = await repository.getByEmail(req.body.email);

            if(user){
                res.status(400).send({
                    message: 'Já existe um usuário com esse e-mail cadastrado'
                });
                return;
            }
            await repository.create({
                name: req.body.name,
                email: req.body.email,
                password: md5(req.body.password),
                // driver: driver,
                roles: [req.body.roles]
            });
            res.status(201).send({
                message: 'Usuário criado com sucesso!'
            });
        }catch(e){
            if(e.errors.email){
                res.status(400).send({
                    message: 'Já existe um usuário com esse e-mail cadastrado'
                });
            }else{
                res.status(400).send({
                    message: 'Falha ao processar sua requisição'
                });
            }
        }
    },

    async authenticate (req, res){
        try{

            const user = await repository.authenticate({
                email: req.body.email,
                password: md5(req.body.password)
            });

            if(!user){
                res.status(404).send({
                    message: 'Usuário ou senha inválidos'
                });
                return;
            }

            const token = await authService.generateToken({
                id: user._id,
                email: user.email,
                name: user.name,
                roles: user.roles
            });

            res.status(201).send({
                token: token,
                data: {
                    email: user.email,
                    name: user.name,
                    roles: user.roles
                }
            });

        }catch(e){
            console.error(e);
            res.status(500).send({
                message: 'Falha ao processar sua requisição'
            });
        }
    },

    async refreshToken(req, res){
        try{
            const token = req.body.token || req.query.token || req.headers['x-access-token'];
            const data = await authService.decodeToken(token);

            const user = await repository.getById(data.id);

            if (!user) {
                res.status(404).send({
                    message: 'Usuário não encontrado'
                });
                return;
            }

            const tokenData = await authService.generateToken({
                id: user._id,
                email: user.email,
                name: user.name,
                roles: user.roles
            });

            res.status(201).send({
                token: tokenData,
                data: {
                    email: user.email,
                    name: user.name
                }
            });
        }catch(e){
            res.status(500).send({
                message: 'Falha ao processar sua requisição'
            });
        }
    }
}