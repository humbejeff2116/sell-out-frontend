






import {useEffect, useState, createContext, useContext } from 'react';

export const MyContext = createContext();

const initialAuthContext = {
    user: null,
    token: null,
    tokenExpiration: null,
    setUserData: ()=>{},
    setTokenData: () =>{},
    isAuthenticated: ()=>{},
}

const AuthContext = createContext(initialAuthContext);

export default function useAuth() {
    return useContext(AuthContext);
}

export function AuthContextProvider(props) {
    const [user, setUser] = useState({});
    const [token, setToken] =  useState(0);
    const [tokenExpiration, setTokenExpiration] = useState(0);
   

    useEffect(()=> {
        setStateOnload();
    }, [user, token, tokenExpiration]);

    const setStateOnload = ( ) => {
        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')): {};
        const token = localStorage.getItem('x-access-token') ? JSON.parse(localStorage.getItem('x-access-token')): null;
        const tokenExpiration = localStorage.getItem('x-access-token-expiration') ? 
        JSON.parse(localStorage.getItem('x-access-token-expiration')): null;
        setUser(user);
        setToken(token);
        setTokenExpiration(tokenExpiration);
    }
    const setUserData = (user) => {
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
    }
    const setTokenData = ( token ) => {
        localStorage.setItem('x-access-token', token);
        const expirationTime = Date.now() + 2 * 60 * 60 * 1000
        localStorage.setItem('x-access-token-expiration', expirationTime);
        setToken(token);
        setTokenExpiration(expirationTime);
    }
    const isAuthenticated = ( ) => { 
        const accessToken = token;
        const accessTokenExpirationTime = tokenExpiration;
        if (!accessToken) {
            return false;
        }
        if ( (accessToken) && (accessTokenExpirationTime > Date.now()) ) {
            return true;
        }
        return false;  
    }

    const values = {
        user: user,
        token: token,
        tokenExpiration: tokenExpiration,
        setUserData: setUserData,
        setTokenData: setTokenData,
        isAuthenticated: isAuthenticated,
    }

    return(
        <AuthContext.Provider value={values} >
            {props.children}
        </AuthContext.Provider>
    )
}



