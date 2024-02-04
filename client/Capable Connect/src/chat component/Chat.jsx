import React, { useContext } from 'react'
import { Container, Stack } from "react-bootstrap"
import { ChatContext } from '../context/ChatProvider'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import UserChat from './UserChat';
import { UserContext } from '../context/UserProvider';
import PotentialChats from './PotentialChats';

function Chat() {

    const { userChats, isUserChatsLoading, userChatsError } = useContext( ChatContext );
    const user = useContext( UserContext )
    console.log( userChats );

  return (
    <Container>
        <PotentialChats/>
        {
            userChats?.length < 0 ? null : 
            <Stack direction='horizontal' gap={4} className='align-items-start'>
                <Stack className="messages-box flex-grow-0 pe-3" gap={3}>
                    {
                        isUserChatsLoading && <p>Chats Loading...</p>
                    }
                    {
                        userChats.map( ( chat, index ) => (
                            <div key={index}>
                                <UserChat chat={chat} user={user}/>
                            </div>
                        ) )
                    }
                </Stack>
                <p>
                    ChatBox
                </p>
            </Stack>
        }
    </Container>
  )
}

export default Chat;