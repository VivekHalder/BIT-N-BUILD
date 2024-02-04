import { useEffect, useMemo, useState } from 'react'
import { io } from 'socket.io-client';
import { Container, Typography, TextField, Button, Stack } from '@mui/material';

export default function ChatApp() {
  const socket = useMemo( () => io("http://localhost:2100"), [] );

  const [ message, setMessage ] = useState("");
  const [ room, setRoom ] = useState("");
  const [ socketID, setSocketID ] = useState("");
  const [ allMessages, setAllMessages ] = useState([]);
  const [ roomName, setRoomName ] = useState("");

  const handleRoomSubmit = ( event ) => {
    event.preventDefault();
    socket.emit("join-to-room", roomName );
    setRoomName("");
  }

  const handleSubmit = ( event ) => {
    event.preventDefault();
    socket.emit( "message", { message, room } );
    setMessage("");
    setRoom("");
  }

  useEffect( () => {
    socket.on('connect', () => {
      setSocketID( socket.id );
      console.log('Connected.');
      console.log('ID is: ', socket.id,'.');
    });

    socket.on( "onJoining", ( msg ) => {
      console.log( msg );
    } );

    socket.on( "disconnect", ( msg ) => {
      console.log( msg );
    } );

    socket.on( "received-message", ( data ) => {
      setAllMessages( prev => [...prev, data] )
      console.log("Received Message", data);
    } )

    return () => {
      socket.disconnect();
    }

  },  [] );

  return (
    <Container maxWidth="sm" className='h-screen'>
      <Typography variant="h1" component="div" gutterBottom>
        Welcome to Capable Connect's chat support
      </Typography>

      <Typography variant="h3" component="div" gutterBottom>
        { 
          `${socketID}`
        }
      </Typography>

      <form onSubmit={handleRoomSubmit}>
        <TextField 
          value={roomName} 
          onChange={(e) => setRoomName(e.target.value)}
          id="outlined-basic" 
          label="Room Name" 
          variant="outlined"
          autoComplete='off'
        />
        <Button 
          type="submit"
          variant="contained" 
          color="primary"
        >
          Send
        </Button>
      </form>

      <form onSubmit={handleSubmit}>
        <TextField 
          value={message} 
          onChange={(e) => setMessage(e.target.value)}
          id="outlined-basic" 
          label="Message" 
          variant="outlined"
          autoComplete='off'
        />
        <TextField 
          value={room} 
          onChange={(e) => setRoom(e.target.value)}
          id="outlined-basic" 
          label="Room No." 
          variant="outlined"
          autoComplete='off'
        />
        <Button 
          type="submit"
          variant="contained" 
          color="primary"
        >
          Send
        </Button>
      </form>
      <Stack>
        {
          allMessages.map( ( msg, ind ) => (
            <Typography key={ind} variant="h6" component="div" gutterBottom>
              { msg.message }
            </Typography>
          ) )
        }
      </Stack>
    </Container>
    );
}
