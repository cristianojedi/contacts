'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config')

const app = express();
const router = express.Router();

// Carrega os Models
const Contact = require('./models/contact');
const User = require('./models/user');

// Conecta ao banco de dados
mongoose.connect(config.connectionString);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Carrega as rotas
const indexRoute = require('./routes/index-route');
const contactRoute = require('./routes/contact-route');
const userRoute = require('./routes/user-route');

// Habilita o CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    next();
});

app.use('/', indexRoute);
app.use('/contacts', contactRoute);
app.use('/users', userRoute);

module.exports = app;