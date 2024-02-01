import dotenv from 'dotenv';

dotenv.config({
  path: '../.env'
});

import { httpServer } from './app.js';
import connectDB from './db/index.js';

const PORT = process.env.PORT || 8100;

connectDB()
.then( () => {
        httpServer.listen( PORT, () => {
            console.log(`The server is up and running at ${ PORT }.`);
        })
    }
)
.catch( ( error ) => {
    console.log(`Error occured while creating the server. Error: ${ error.message }.`);
} );