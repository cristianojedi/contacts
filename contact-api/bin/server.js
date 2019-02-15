'use strict';

// Configuração do servidor web
const app = require('../src/app');
const http = require('http');
const debug = require('debug')('contactapi:server');

// Configuração da porta
const port = 3000;
app.set('port', port);

// Configura e cria o servidor
const server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

// Recebe os erros do servidor
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

// Recupera as informações do servidor e starta o debug
function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}

module.exports = server;