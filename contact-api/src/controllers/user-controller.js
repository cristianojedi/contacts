'use strict'

const Validation = require('../validators/fluent-validator');
const repository = require('../repositories/user-repository');
const md5 = require('md5');
const authService = require('../services/auth-service');

exports.getById = async (req, res, next) => {
    try {
        let data = await repository.getById(req.params.id);

        if (data == null) {
            res.status(404).send({
                message: 'Usuário não encontrado'
            })
        } else {
            res.status(200).send(data);
        }
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar a requisição getById()'
        });
    }
}

exports.post = async (req, res, next) => {
    let validation = new Validation();

    // name
    validation.isRequired(req.body.name, 'O nome é obrigatório');
    validation.hasMinLen(req.body.name, 2, 'O nome deve conter no mínimo 2 caracteres');
    validation.hasMaxLen(req.body.name, 100, 'O nome deve conter no máximo 100 caracteres');

    // e-mail
    validation.isRequired(req.body.email, 'O e-mail é obrigatório');
    validation.isEmail(req.body.email, 'E-mail inválido');
    validation.hasMaxLen(req.body.email, 100, 'O nome deve conter no máximo 100 caracteres');

    // password
    validation.isRequired(req.body.password, 'A senha é obrigatória');
    validation.hasMinLen(req.body.password, 6, 'A senha deve conter no mínimo 6 caracteres');
    validation.hasMaxLen(req.body.password, 20, 'A senha deve conter no máximo 20 caracteres');

    // Verifica se os dados estão válidos
    if (!validation.isValid()) {
        res.status(400).send(validation.errors()).end();
        return;
    }

    try {
        await repository.create({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password + global.API_SECRET)
        });
        res.status(201).send({
            data: {
                email: req.body.email,
                password: req.body.password
            },
            message: 'Usuário cadastrado com sucesso'
        });
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar a requisição post()'
        });
    }
}

exports.authenticate = async (req, res, next) => {
    try {
        let user = await repository.authenticate({
            email: req.body.email,
            password: md5(req.body.password + global.API_SECRET)
        });

        if (!user) {
            res.status(404).send({
                message: 'Usuário ou senha inválidos'
            });
            return;
        }

        let token = await authService.generateToken({
            id: user._id,
            email: user.email,
            name: user.name
        });

        res.status(201).send({
            // email: user.email,
            // name: user.name

            token: token,
            data: {
                email: user.email,
                name: user.name
            }
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar a requisição authenticate()'
        });
    }
};