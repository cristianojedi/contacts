'use strict'

const mongoose = require('mongoose');
const Contact = mongoose.model('Contact');

exports.get = async () => {
    let res = await Contact.find(
        {},
        'name email twitter phone');
    return res;
}

exports.getById = async (id) => {
    let res = await Contact.findById(id, 'name email twitter phone');
    return res;
}

exports.create = async (data) => {
    let contact = new Contact();
    contact.name = data.name;
    contact.email = data.email;
    contact.twitter = data.twitter;
    contact.phone = data.phone;
    await contact.save();
}

exports.update = async (id, data) => {
    let res = await Contact
        .findByIdAndUpdate(id, {
            $set: {
                name: data.name,
                email: data.email,
                twitter: data.twitter,
                phone: data.phone
            }
        });
    return res;
}

exports.delete = async (id) => {
    let res = await Contact.findByIdAndRemove(id);
    return res;
}