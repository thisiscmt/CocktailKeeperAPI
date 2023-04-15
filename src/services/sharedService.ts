import { scrypt, randomBytes, timingSafeEqual } from 'crypto';
import { promisify } from 'util';
import session from 'express-session';

const scryptAsync = promisify(scrypt);

export const getDateValue = (value: string) => {
    const newDate = new Date(value);
    const monthPart = (newDate.getMonth() + 1).toString().padStart(2, '0');
    const dayPart = newDate.getDate().toString().padStart(2, '0');

    return `${newDate.getFullYear()}-${monthPart}-${dayPart}`;
};
