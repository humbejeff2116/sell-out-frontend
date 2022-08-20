
import React, { useEffect } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import useAuth from '../../Context/context';


export default function RequireAuthentication(Component, auth, redirectTo) {
    function AuthenticatedComponent(props) {
        const { isAuthenticated, wipeToken } = useAuth();
        const location = useLocation();
        const auth = isAuthenticated();
        const redirectPath = redirectTo ? redirectTo : "/login";

        useEffect(() => {
            if (!auth) {
                wipeToken();
            }
        }, [auth, wipeToken]);

        if (!auth) {
            sessionStorage.setItem("currentLocation", JSON.stringify(location.pathname));

            return (
                <Redirect to={ redirectPath }/>
            )
        }

        return (  
            <Component { ...props }/>
        )    
    }
    
    return AuthenticatedComponent;
}