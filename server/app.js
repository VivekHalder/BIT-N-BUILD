import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { limit } from './constants.js';
import { createServer } from 'http';
import socketHandler from './socket/socketHandler.js';

const app = express();
const httpServer = createServer( app );

app.use( express.json({
    limit,
    extended: true
}) )

app.use( express.urlencoded( 
    {
        extended: true,
        limit
    }
) );

app.use( cors({
    origin: "http://localhost:5173",
    credentials: true,
}) );

app.use( cookieParser() );

import userRoutes from './routes/user.routes.js';
app.use('/api/v1/users', userRoutes);

socketHandler( httpServer );

export { httpServer };