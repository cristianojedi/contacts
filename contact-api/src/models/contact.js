'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    twitter: {
        type: String,
        trim: true
    },
    phone: {
        type: Number,
    }
});

schema.methods.getData = function () {
    return {
        _id: this._id,
        name: this.name,
        email: this.email,
        twitter: this.twitter,
        phone: this.phone
    };
};

module.exports = mongoose.model('Contact', schema);