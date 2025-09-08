import http from 'http';

import app from './app.js';

const port = process.env.PORT || 3060;

function onError(error: NodeJS.ErrnoException) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    let exitProcess = false;

    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            exitProcess = true;

            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            exitProcess = true;

            break;
        default:
            throw error;
    }

    if (exitProcess) {
        process.exit(1);
    }
}

try {
    app.set('port', port);

    const server = http.createServer(app);
    server.listen(port);
    server.on('error', onError);

    console.log(`Cocktail Keeper API has started on port ${port}`);
} catch(error) {
    console.log('Error starting the API: %o', error);
    process.exit(1);
}
