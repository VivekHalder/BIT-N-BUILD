import React, { useContext } from 'react'
import { ChatContext } from '../context/ChatProvider'
import { UserContext } from '../context/UserProvider';

function PotentialChats() {
    const user = useContext( UserContext )
    const { potentialChats, createChats } = useContext( ChatContext );
    console.log("Potential Chats", potentialChats); 
  return (
    <>
      <div className="all-users">
        {
          potentialChats && 
            potentialChats.map(( u, ind ) => {
              return (
                <div className="single-user" key={ind} onClick={() => createChats( user._id, u._id )}>
                  { u.name }
                  <span className='user-online'></span>
                </div>
              )
            })
        }
      </div>
    </>
  )
}

export default PotentialChats;