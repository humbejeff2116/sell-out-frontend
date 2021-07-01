

import {useEffect, useState } from 'react';
import socket from '../Components/Socket/socket';
import {AuthContext } from './context';


export function AuthContextProvider(props) {
    const [user, setUser] = useState(null);
    const [token, setToken] =  useState(0);
    const [tokenExpiration, setTokenExpiration] = useState(0);
   

    useEffect(()=> {
       socket.on('connect', function() {
        setStateOnload();
       })
       
    }, [user, token, tokenExpiration]);

    const setStateOnload = ( ) => {
        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
        const token = localStorage.getItem('x-access-token') ? localStorage.getItem('x-access-token') : null;
        const tokenExpiration = localStorage.getItem('x-access-token-expiration') ? 
        localStorage.getItem('x-access-token-expiration') : null;
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
        const token = localStorage.getItem('x-access-token') ? localStorage.getItem('x-access-token') : null;
        const tokenExpiration = localStorage.getItem('x-access-token-expiration') ? 
        localStorage.getItem('x-access-token-expiration') : null;
        if (!token) {
            return false;
        }
        if ( (token) && (tokenExpiration > Date.now()) ) {
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