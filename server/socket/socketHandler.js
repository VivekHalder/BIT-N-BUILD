import { Server } from 'socket.io';

function socketHandler(httpServer) {
    const io = new Server( httpServer, {
        cors: {
            origin: "http://localhost:5173",
            methods: [ "GET", "POST" ],
            credentials: true,
        }
    } );
    
    //check for the user.
    //use io.use().
    //proceed only if user is present.
    
    io.on( 'connection', ( socket ) => {
        console.log('A user connected.');
        console.log('Socket ID: ', socket.id);
    
        socket.emit( 'onJoining', "Welcome to VChat." );
    
        socket.broadcast.emit( "onJoining", `User with ${ socket.id } joined.` );
    
        socket.on( "message", ( data ) => {
            console.log(data);
            io.to(data.room).emit("received-message", { message: data.message, sender: socket.id });
        } );
    
        socket.on( "join-to-room", ( room ) => {
            socket.join( room );
        } )
    
        socket.on( 'disconnect', () => {
            console.log(`${socket.id} disconnected.`);
        } );
    
    } );
}

export default socketHandler;