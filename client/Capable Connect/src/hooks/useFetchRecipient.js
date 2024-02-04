import { useEffect, useState } from "react";
import { getRequest } from "../services/services";

export const useFetchRecipient = (chat, user) => {
    const [ recipientUser, setRecipientUser ] = useState(null);
    const [ error, setError ] = useState(null);

    const recipientId = chat?.members.find((id) => id !== user?.id);

    const getUser = async () => {
        if( !recipientId ) return null;

        const response = await getRequest( `http://localhost:2100/api/v1/users/find/${recipientId}` );

        if( response.error ){
            return setError( response );
        }

        setRecipientUser( response );
    }

    useEffect( () => {
        getUser();
    }, [] );

    return { recipientId };
}