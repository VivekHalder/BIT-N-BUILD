import React, { useContext } from 'react'
import { Container, Stack } from "react-bootstrap"
import { ChatContext } from '../context/ChatProvider'

function Chat() {

    const { userChats, isUserChatsLoading, userChatsError } = useContext( ChatContext );

    console.log( userChats );

  return (
    <Container>
        {
            userChats?.length < 1 ? null : 
            <Stack>
                <Stack>
                    List
                </Stack>
                <p>

                </p>

            </Stack>
        }
    </Container>
  )
}

export default Chat