import axios from 'axios';

export const getRequest = async ( url, withCredentials = false ) => {

    try {
        const res = await axios( url, { withCredentials } );

        return { error: false, message: "OK", data: res };

    } catch (error) {
        console.error(`Error occcured. Error: ${ error.message }`);
        return { error: true, message: error.message, data: null }
    }
}