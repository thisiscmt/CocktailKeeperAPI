import express, {Request, Response} from 'express';

import * as AuthService from '../services/authService.js';
import * as DataService from '../services/dataService.js';

const cocktailRouter = express.Router();

cocktailRouter.get('/backup', async (request: Request, response: Response) => {
    try {
        const user = AuthService.verifyUser(request.headers.authorization || '');

        if (user) {
            const backupType = request.query.backupType || '';
            let cocktailDataJSON = '';

            switch (backupType) {
                case 'server':
                    cocktailDataJSON = DataService.getServerBackup(user);
                    break;
                default:
                    response.status(500).send('Unsupported backup type specified');
                    return;
            }

            response.status(200).send(cocktailDataJSON);
        } else {
            response.status(500).send('Authentication failed');
        }
    } catch (error) {
        // TODO: Log this somewhere
        console.log(error);

        response.status(500).send('Error retrieving cocktail data');
    }
});

cocktailRouter.post('/backup', (request: Request, response: Response) => {
    try {
        const user = AuthService.verifyUser(request.headers.authorization || '');

        if (user) {
            DataService.createServerBackup(user, request.body.data);
            response.status(200).send();
        } else {
            response.status(500).send('Authentication failed');
        }
    } catch (error) {
        // TODO: Log this somewhere
        console.log(error);

        response.status(500).send('Error storing cocktail data');
    }
});

export default cocktailRouter;
