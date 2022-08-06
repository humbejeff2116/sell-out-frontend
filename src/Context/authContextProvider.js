
import { useEffect, useState } from 'react';
import socket from '../Components/Socket/socket';
import { AuthContext } from './context';


export function AuthContextProvider(props) {
    const [user, setUser] = useState(null);
    const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);
    const [outsideLoginPopUpMessage, setOutsideLoginPopUp] = useState(null);
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

        if (!token) return false;
        if (token && (tokenExpiration > Date.now())) {
            setUser(user);
            setUserIsLoggedIn(true);
            setToken(token);
            setTokenExpiration(tokenExpiration);
            return;
        }
        if (user && !token) {
            setUser(user);
            setUserIsLoggedIn(false);
            setToken(null);
            setTokenExpiration(null);
            return 
        }
        setUser(null);
        setUserIsLoggedIn(false);
        setToken(null);
        setTokenExpiration(null); 
    }

    const setUserData = (user) => {
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
        setUserIsLoggedIn(true);
    }

    const setTokenData = ( token ) => {
        localStorage.setItem('x-access-token', token);
        const expirationTime = Date.now() + 2 * 60 * 60 * 1000
        localStorage.setItem('x-access-token-expiration', expirationTime);
        setToken(token);
        setTokenExpiration(expirationTime);
    }

    const isAuthenticated = () => { 
        const token = localStorage.getItem('x-access-token') ? localStorage.getItem('x-access-token') : null;
        const tokenExpiration = localStorage.getItem('x-access-token-expiration') ? 
        localStorage.getItem('x-access-token-expiration') : null;
        if (!token) return false;
        if (token && (tokenExpiration > Date.now())) return true;
        return false; 
    }

    const logOut = () => {
        setUser(null);
        setUserIsLoggedIn(false);
        setOutsideLoginPopUpMessage(null);
        setViewUserProfileData({});
        setToken(null);
        setTokenExpiration(null);
        localStorage.removeItem('user');
        localStorage.removeItem('x-access-token');
        localStorage.removeItem('x-access-token-expiration');
    }

    const setOutsideLoginPopUpMessage = ({ type, show, message }, showMessage = false) => {
        if (!showMessage) {
            setOutsideLoginPopUp(prevState => ({ ...prevState, show: false }));
            return;
        }
        setOutsideLoginPopUp({ type, show, message });
    }
   
    const values = {
        user: user,
        userIsLoggedIn: userIsLoggedIn,
        token: token,
        tokenExpiration: tokenExpiration,
        viewUserProfileData: viewUserProfileData,
        outsideLoginPopUpMessage: outsideLoginPopUpMessage,
        setOutsideLoginPopUpMessage: setOutsideLoginPopUpMessage,
        setUserData: setUserData,
        setUserIsLoggedIn: setUserIsLoggedIn,
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