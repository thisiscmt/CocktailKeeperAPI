import path from 'path';
import fs from 'fs';

import { User } from '../models/models.js';
import { COCKTAIL_DATA_FILE } from '../constants/constants.js';

// TODO: Switch these to use async versions of the fs functions
export const getServerBackup = (user: User) => {
    const dataFilePath = path.join(process.cwd(), 'app_data', user.id, COCKTAIL_DATA_FILE);

    if (fs.statSync(dataFilePath, { throwIfNoEntry: false })) {
        return fs.readFileSync(dataFilePath, { encoding: 'utf8' });
    } else {
        return '';
    }
};

export const createServerBackup = (user: User, cocktailDataJSON: string) => {
    const userPath = path.join(process.cwd(), 'app_data', user.id);

    try {
        fs.statSync(userPath);
    } catch (error) {
        fs.mkdirSync(userPath);
    }

    const dataFilePath = path.join(userPath, COCKTAIL_DATA_FILE);
    fs.writeFileSync(dataFilePath, cocktailDataJSON, { encoding: 'utf8'});
};
