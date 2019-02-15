'use strict'

const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.getById = async (id) => {
    let res = await User.findById(id, 'name email password');
    return res;
}

exports.create = async (data) => {
    let user = new User();
    user.name = data.name;
    user.email = data.email;
    user.password = data.password;
    await user.save();
}

exports.authenticate = async (data) => {
    let res = await User.findOne({
        email: data.email,
        password: data.password
    });
    return res;
}