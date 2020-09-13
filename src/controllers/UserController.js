'use strict';

const repository = require('../repositories/UserRepository');
const md5 = require('md5');

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
            await repository.create({
                name: req.body.name,
                email: req.body.email,
                password: md5(req.body.password)
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
    }
}