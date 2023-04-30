import fs from 'fs';
import path from 'path';

import { User } from '../models/models';

export const getUser = (userName: string) => {
    const filePath = path.join(process.cwd(), 'app_data', 'users.dat');
    const userData = fs.readFileSync(filePath, 'utf8');
    let user;

    if (userData) {
        const users = JSON.parse(userData);

        for (const knownUser of users) {
            if (knownUser.userName === userName) {
                user = knownUser;
                break;
            }
        }
    }

    return user;
}

export const validUser = (user: User, password: string) => {
    let valid = false;

    if (user && user.password === password) {
        valid = true;
    }

    return valid;
}

export const verifyUser = (authHeader: string): User | undefined => {
    let user: User;
    let decodedCreds: string;
    let index: number;

    if (authHeader.startsWith('Basic ')) {
        decodedCreds = Buffer.from(authHeader.substring(6), 'base64').toString('ascii');
        index = decodedCreds.indexOf(':');
        user = getUser(decodedCreds.substring(0, index));

        if (validUser(user, decodedCreds.substring(index + 1))) {
            return user;
        }
    }

    return undefined;
}
