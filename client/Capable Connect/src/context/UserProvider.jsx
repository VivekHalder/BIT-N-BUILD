import { createContext, useReducer } from "react";

const initialState = {
    user: null
}

const actionTypes = {
    LOGIN_USER: 'LOGIN_USER',
    LOGOUT_USER: 'LOGOUT_USER'
}

const userReducers = ( state, action ) => {
    switch ( action.type ) {
        case actionTypes.LOGIN_USER:
            return {
                ...state,
                user: Object.assign( {}, action.payload )                
            }
        case actionTypes.LOGOUT_USER:
            return {
                ...state,
                user: null
            }
        default:
            return state;
    }   
}

export const UserContext = createContext(null);

export const UserContextProvider = ( { children } ) => {
    const [ state, dispatch ] = useReducer( userReducers, initialState );

    const UserActions = {
        loginUser: ( user ) => dispatch( { type: actionTypes.LOGIN_USER, payload: user } ),
        logoutUser: () => dispatch( { type: actionTypes.LOGOUT_USER } )
    }

    return (
        <UserContext.Provider value={{ ...state, ...UserActions }} >
            { children }
        </UserContext.Provider>
    )

}