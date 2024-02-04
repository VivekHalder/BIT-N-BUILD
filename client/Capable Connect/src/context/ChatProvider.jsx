import { createContext, useCallback, useEffect, useState } from "react";
import { postRequest, getRequest } from "../services/services";

export const ChatContext = createContext(null);

export const ChatProvider = ( { children, user } ) => {
    const [ userChats, setUserChats ] = useState([]);
    const [ isUserChatsLoading, setIsUserChatsLoading ] = useState(false);
    const [ userChatsError, setUserChatsError ] = useState( null );
    const [ potentialChats, setPotentialChats ] = useState([]);

    const getUserChats = async () => {
        if( user?._id ){
            setIsUserChatsLoading( true );
            setUserChatsError(null);

            const res = await getRequest( `http://localhost:2100/api/v1/messages/get-messages/${user?._id}`, false );

            setIsUserChatsLoading( false );

            if( res.error ){
                setUserChatsError( res );
            }

            setUserChats( res.data.data.data );
        }
    }

    const getUsers = async () => {
        const response = await getRequest( "http://localhost:2100/api/v1/users/get-all-users" );

        if( response.error ){
            return console.log( "Error fetching the users", response );            
        }

        console.log(response.data.data.data);

        const pChats = (response.data.data.data).filter( ( u ) => {
            let isChatCreated = false;

            if( user?._id  === u?._id ) return false;

            if( userChats ){
                isChatCreated = userChats?.some( ( chat ) => {
                    return chat.members[0] === u._id || chat.members[1] === u._id;
                } );
            }

            return !isChatCreated;
        } );

        setPotentialChats( pChats );
    }

    const createChats = useCallback( async ( firstId, secondId ) => {
        const res = await postRequest( "http://localhost:2100/api/v1/chats/", { firstId, secondId } );

        if( res.error ){
            return console.log( `Error occured while creating the chat. Error: ${ res.error }` );
        }

        setUserChats( prev => [ ...prev, res.data.data.data.members ] );        

    }, [] );

    useEffect( () => {
        getUserChats();
    },[] );

    useEffect( () => {
        getUsers();
    }, [ userChats ] );

    return (
        <ChatContext.Provider 
            value={{
                userChats,
                isUserChatsLoading,
                userChatsError,
                potentialChats,
                createChats
            }}
        >
            { children }
        </ChatContext.Provider>
    );
}