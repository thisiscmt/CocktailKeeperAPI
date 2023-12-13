import path from 'path';
import fs from 'fs';

import { User } from '../models/models.js';
import { COCKTAIL_DATA_FILE } from '../constants/constants.js';

export const getServerBackup = (user: User): Promise<string> => {
    return new Promise((resolve, reject) => {
        const dataFilePath = path.join(process.cwd(), 'app_data', user.id, COCKTAIL_DATA_FILE);

        fs.readFile(dataFilePath, { encoding: 'utf8' }, (error, data) => {
            if (error) {
                reject(error);
            }

            resolve(data);
        });
    });
};

export const createServerBackup = (user: User, cocktailDataJSON: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        const userPath = path.join(process.cwd(), 'app_data', user.id);

        fs.mkdir(userPath, () => {
            const dataFilePath = path.join(userPath, COCKTAIL_DATA_FILE);

            fs.writeFile(dataFilePath, cocktailDataJSON, { encoding: 'utf8' }, (error) => {
                if (error) {
                    reject(error);
                }

                resolve();
            });
        });
    });
};
