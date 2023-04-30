import express, {Request, Response} from 'express';
import fs from 'fs';
import path from 'path';

import * as DataService from '../services/dataService.js';
import * as Constants from '../constants/constants.js';

const cocktailRouter = express.Router();

cocktailRouter.get('/backup/server', async (request: Request, response: Response) => {
    try {
        const user = DataService.verifyUser(request.headers.authorization || '');

        if (user) {
            const filePath = path.join(process.cwd(), 'app_data', user.id, Constants.COCKTAIL_DATA_FILE);

            if (fs.statSync(filePath, { throwIfNoEntry: false })) {
                const cocktailDataJSON = fs.readFileSync(filePath, { encoding: 'utf8' });
                response.contentType('application/json');
                response.status(200).send(cocktailDataJSON);
            } else {
                response.status(500).send('Could not find cocktail data');
            }
        } else {
            response.status(500).send('Authentication failed');
        }
    } catch (error) {
        // TODO: Log this somewhere
        console.log(error);

        response.status(500).send('Error retrieving cocktail data');
    }
});

cocktailRouter.post('/backup/server', (request: Request, response: Response) => {
    try {
        const user = DataService.verifyUser(request.headers.authorization || '');

        if (user) {
            const filePath = path.join(process.cwd(), 'app_data', user.id, Constants.COCKTAIL_DATA_FILE);

            try {
                fs.statSync(filePath);
            } catch (error) {
                fs.mkdirSync(path.dirname(filePath));
            }

            fs.writeFileSync(filePath, JSON.stringify(request.body), { encoding: 'utf8'});
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
