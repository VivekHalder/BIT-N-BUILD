import mongoose from 'mongoose';

async function connectDB(){
    try {
        const connectionInstance = await mongoose.connect( process.env.MONGODB_URI );

        if( connectionInstance ){
            console.log(`MongoDB connected successfully. Host-name: ${ connectionInstance.connection.host }.`)
        }
    } catch (error) {
        console.log(`Error occured while connecing the database.`);
        process.exit(1);
    }
}

export default connectDB;