import express, {Request, Response} from 'express';
import fs from 'fs';
import path from 'path';

import { User } from '../models/models.js';
import * as AuthService from '../services/authService.js';
import * as Constants from '../constants/constants.js';

const cocktailRouter = express.Router();

const getServerBackup = (user: User) => {
    const filePath = path.join(process.cwd(), 'app_data', user.id, Constants.COCKTAIL_DATA_FILE);

    if (fs.statSync(filePath, { throwIfNoEntry: false })) {
        return fs.readFileSync(filePath, { encoding: 'utf8' });
    } else {
        return '';
    }
};

const createServerBackup = (user: User, cocktailDataJSON: string) => {
    const filePath = path.join(process.cwd(), 'app_data', user.id, Constants.COCKTAIL_DATA_FILE);

    try {
        fs.statSync(filePath);
    } catch (error) {
        fs.mkdirSync(path.dirname(filePath));
    }

    fs.writeFileSync(filePath, cocktailDataJSON, { encoding: 'utf8'});
};

cocktailRouter.get('/backup', async (request: Request, response: Response) => {
    try {
        const user = AuthService.verifyUser(request.headers.authorization || '');

        if (user) {
            const backupType = request.body.backupType || '';
            let cocktailDataJSON = '';
            switch (backupType) {
                case 'Server':
                    cocktailDataJSON = getServerBackup(user);
                    break;
                default:
                    response.status(500).send('Unsupported backup type specified');
                    break;
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
            createServerBackup(user, request.body);
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
