'use strict';

const Validation = require('../validators/fluent-validator')
const repository = require('../repositories/contact-repository');
const md5 = require('md5');

// Busca todos os contatos
exports.get = async (req, res, next) => {
    try {
        let data = await repository.get();

        if (data == null) {
            res.status(404).send({
                message: 'Nenhum contato cadastrado'
            });
        } else {
            res.status(200).send(data);
        }
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar a requisição get()'
        });
    }
}

// Busca um contato pelo id
exports.getById = async (req, res, next) => {
    try {
        let data = await repository.getById(req.params.id);

        if (data == null) {
            res.status(404).send({
                message: 'Contato não encontrado'
            });
        } else {
            res.status(200).send(data);
        }
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar a requisição getById()'
        });
    }
}

// Cria um contato
exports.post = async (req, res, next) => {

    // Validações
    let validation = new Validation();

    // name
    validation.isRequired(req.body.name, 'O nome é obrigatório');
    validation.hasMinLen(req.body.name, 2, 'O nome deve conter no mínimo 2 caracteres');
    validation.hasMaxLen(req.body.name, 100, 'O nome deve conter no máximo 100 caracteres');

    // e-mail
    validation.isRequired(req.body.email, 'O e-mail é obrigatório');
    validation.isEmail(req.body.email, 'E-mail inválido');
    validation.hasMaxLen(req.body.email, 100, 'O nome deve conter no máximo 100 caracteres');

    // twitter
    validation.hasMaxLen(req.body.twitter, 30, 'O twitter deve conter no máximo 30 caracteres');

    // phone
    validation.isNumber(req.body.phone, 'Telefone inválido');

    // Verifica se os dados estão válidos
    if (!validation.isValid()) {
        res.status(400).send(validation.errors()).end();
        return;
    }

    try {
        await repository.create({
            name: req.body.name,
            email: req.body.email,
            twitter: req.body.twitter,
            phone: req.body.phone
        });
        res.status(201).send({
            message: 'Contato cadastrado com sucesso'
        });
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar a requisição post()'
        });
    }
}

// Altera um contato
exports.patch = async (req, res, next) => {

    // Validações
    let validation = new Validation();

    // name
    validation.isRequired(req.body.name, 'O nome é obrigatório');
    validation.hasMinLen(req.body.name, 2, 'O nome deve conter no mínimo 2 caracteres');
    validation.hasMaxLen(req.body.name, 100, 'O nome deve conter no máximo 100 caracteres');

    // e-mail
    validation.isRequired(req.body.email, 'O e-mail é obrigatório');
    validation.isEmail(req.body.email, 'E-mail inválido');
    validation.hasMaxLen(req.body.email, 100, 'O nome deve conter no máximo 100 caracteres');

    // phone
    validation.isNumber(req.body.phone, 'Telefone inválido');

    // Verifica se os dados estão válidos
    if (!validation.isValid()) {
        res.status(400).send(validation.errors()).end();
        return;
    }

    try {
        let data = await repository.update(req.params.id, req.body);

        if (data == null) {
            res.status(404).send({
                message: 'Contato não encontrado para alteração'
            });
        } else {
            res.status(200).send({
                message: 'Contato atualizado com sucesso'
            });
        }
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar a requisição patch()'
        });
    }
}

// Deleta um contato
exports.delete = async (req, res, next) => {
    try {
        let data = await repository.delete(req.params.id);

        if (data == null) {
            res.status(404).send({
                message: 'Contato não encontrado para exclusão'
            });
        } else {
            res.status(204).send({
                message: 'Contato removido com sucesso'
            });
        }
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar a requisição delete()'
        });
    }
}