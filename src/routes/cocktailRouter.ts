import express, {Request, Response} from 'express';

import * as AuthService from '../services/authService.js';
import * as DataService from '../services/dataService.js';

const cocktailRouter = express.Router();

cocktailRouter.get('/backup', async (request: Request, response: Response) => {
    try {
        const user = AuthService.verifyUser(request.headers.authorization || '');

        if (user) {
            const provider = request.query.provider || '';
            let cocktailDataJSON = '';

            switch (provider) {
                case 'server':
                    cocktailDataJSON = await DataService.getServerBackup(user);
                    break;
                default:
                    response.status(400).send('Unsupported provider specified');
                    return;
            }

            response.status(200).send(cocktailDataJSON);
        } else {
            response.status(401).send('Authentication failed');
        }
    } catch (error) {
        // TODO: Log this somewhere
        console.log(error);

        response.status(500).send('Error retrieving cocktail data');
    }
});

cocktailRouter.post('/backup', async (request: Request, response: Response) => {
    try {
        const user = AuthService.verifyUser(request.headers.authorization || '');

        if (user) {
            await DataService.createServerBackup(user, request.body.data);
            response.status(200).send();
        } else {
            response.status(401).send('Authentication failed');
        }
    } catch (error) {
        // TODO: Log this somewhere
        console.log(error);

        response.status(500).send('Error storing cocktail data');
    }
});

export default cocktailRouter;
