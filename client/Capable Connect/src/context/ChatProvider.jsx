import { createContext, useEffect, useState } from "react";
import { getRequest } from "../services/services";

export const ChatContext = createContext(null);

export const ChatProvider = ( { children, user } ) => {
    const [ userChats, setUserChats ] = useState(null);
    const [ isUserChatsLoading, setIsUserChatsLoading ] = useState(false);
    const [ userChatsError, setUserChatsError ] = useState( null );

    const getUserChats = async () => {
        if( user?._id ){
            setIsUserChatsLoading( true );
            setUserChatsError(null);

            const res = await getRequest( `http://localhost:2100/api/v1/messages/get-messages/${user?._id}`, false );

            setIsUserChatsLoading( false );

            if( res.error ){
                setUserChatsError( res );
            }

            setUserChats( res.data );
        }
    }

    useEffect( () => {
        getUserChats();
    },[] );

    return (
        <ChatContext.Provider 
            value={{
                userChats,
                isUserChatsLoading,
                userChatsError
            }}
        >
            { children }
        </ChatContext.Provider>
    );
}