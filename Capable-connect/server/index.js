import dotenv from 'dotenv';

dotenv.config({
    path: "../.env"
});

import { app } from './app.js';


const PORT = process.env.PORT || 2100;

app.listen( PORT, () => {
    try {
        console.log(`The server is up and running at ${ PORT }.`);
    } catch (error) {
        console.log(`Error occured while creating the server. Error: ${ error.message }.`);
    }
} )

import {Server, Socket} from 'socket.io';

const io=new Server(8000,{
   cors: true
});

const emailTosocketIDMap=new Map()
const socketIDToemailMap=new Map()

io.on("connection",(socket)=>{
    console.log("Socket Connected",socket.id)
    socket.on("join:room",data=>{
        const{email,roomID}=data

        emailTosocketIDMap.set(email,socket.id)
        socketIDToemailMap.set(socket.id,email)

        socket.join(roomID)
        io.to(roomID).emit("user:joined",{email,id:socket.id})

        io.to(socket.id).emit("join:room",data)
    })

        socket.on("user:call",({toID,offer})=>{
        console.log("Offer received in Backend:",offer)
        console.log(toID)
        io.to(toID).emit("incoming:call",{from:socket.id,offer})
    })

    socket.on("call:accepted",(({to,ans})=>{
        io.to(to).emit("call:accepted",{from:socket.id,ans})

    }))
});