import express from 'express';
import cors from 'cors';
import helmet from "helmet";

import baseRouter from './routes/baseRouter.js';
import cocktailRouter from './routes/cocktailRouter.js';

const app = express();

app.disable('x-powered-by');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: function(_origin, callback){
        if (process.env.NODE_ENV === 'production') {
            return callback(null, process.env.CK_ALLOWED_ORIGIN)
        } else {
            return callback(null, true);
        }
    },
    credentials: true
}));

app.use(helmet({
    crossOriginResourcePolicy: {
        policy: 'cross-origin'
    }
}));

if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1);
}

app.use('/', baseRouter);
app.use('/cocktail', cocktailRouter);

export default app;
