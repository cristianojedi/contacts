'use strict'

const mongoose = require('mongoose');
const User = mongoose.model('User');

// Busca um usuário pelo id
exports.getById = async (id) => {
    let res = await User.findById(id, 'name email password');
    return res;
}

// Cria um usuário
exports.create = async (data) => {
    let user = new User();
    user.name = data.name;
    user.email = data.email;
    user.password = data.password;
    await user.save();
}

// Busca um usuário pelo email e password
exports.authenticate = async (data) => {
    let res = await User.findOne({
        email: data.email,
        password: data.password
    });
    return res;
}