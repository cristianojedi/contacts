'use strict';

const express = require('express');
const router = express.Router();

// Configuração das rotas de index
router.get('/', (req, res, next) => {
    res.status(200).send({
        title: "Contacts API",
        version: "0.0.2"
    });
});

module.exports = router;