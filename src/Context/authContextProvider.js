
import { useEffect, useState } from 'react';
import socket from '../Components/Socket/socket';
import { AuthContext } from './context';


export function AuthContextProvider(props) {

    const [user, setUser] = useState(null);

    const [token, setToken] =  useState(null);

    const [viewUserProfileData, setViewUserProfileData] = useState({});

    const [tokenExpiration, setTokenExpiration] = useState(null);
   

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

        if (!token) {

            return false;

        }

        if ( (token) && (tokenExpiration > Date.now()) ) {

            setUser(user);

            setToken(token);

            setTokenExpiration(tokenExpiration);

            return true;

        }

        if (user && !token) {

            return setUser(user);

        }

        setUser(null);

        setToken(null);

        setTokenExpiration(null);

        return false; 

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

    const logOut = () => {
        
        setUser(null);

        setToken(null);

        setTokenExpiration(null);

        localStorage.removeItem('user')

        localStorage.removeItem('x-access-token');

        localStorage.removeItem('x-access-token-expiration')

    }
   
    const values = {
        user: user,
        token: token,
        tokenExpiration: tokenExpiration,
        viewUserProfileData: viewUserProfileData,
        setUserData: setUserData,
        setTokenData: setTokenData,
        isAuthenticated: isAuthenticated,
        setViewUserProfileData: setViewUserProfileData,
        logOut: logOut
    }

    return(

        <AuthContext.Provider value={values} >
            {props.children}
        </AuthContext.Provider>

    )
    
}