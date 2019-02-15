'use strict';
const jwt = require('jsonwebtoken');

// Gera um token
exports.generateToken = async (data) => {
    return jwt.sign(data, global.API_SECRET, { expiresIn: '1d' });
}

// Autoriza um usuário
exports.authorize = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    
    if (!token) {
        res.status(401).json({
            message: 'Acesso Restrito'
        });
    } else {
        jwt.verify(token, global.API_SECRET, function (error, decoded) {
            if (error) {
                res.status(401).json({
                    message: 'Token Inválido'
                });
            } else {
                next();
            }
        });
    }
};