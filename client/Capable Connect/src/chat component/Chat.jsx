import React, { useContext } from 'react'
import { ChatContext } from '../context/ChatProvider'

function Chat() {

    const { userChats, isUserChatsLoading, userChatsError } = useContext( ChatContext );

    console.log( userChats );

  return (
    <div>Chat</div>
  )
}

export default Chat