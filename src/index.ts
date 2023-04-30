import debug from 'debug';
import http from 'http';
import app from './app.js';

debug('cocktail-keeper');

function onError(error: NodeJS.ErrnoException) {
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

function onListening() {
    const addr = server.address();

    if (addr) {
        const bind = typeof addr === 'string'
            ? 'pipe ' + addr
            : 'port ' + addr.port;

        debug('Listening on ' + bind);
    }
}

const port = process.env.PORT || 3060;
app.set('port', port);

const server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

console.log(`Cocktail Keeper API has started on port ${port}`);
