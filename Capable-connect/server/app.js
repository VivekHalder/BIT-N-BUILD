import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { limit } from './constants.js';

const app = express();

app.use( express.urlencoded( 
    {
        extended: true
    }
) );

app.use( cors({
    origin: "*",
    limit,
}) );

app.use( cookieParser() );

import userRoutes from './routes/user.routes.js';
app.use('/api/v1/users', userRoutes);

export { app };