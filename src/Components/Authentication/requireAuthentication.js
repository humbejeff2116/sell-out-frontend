
import React from 'react';
import { Redirect } from 'react-router-dom';
import useAuth from '../../Context/context';


export default function RequireAuthentication(Component, auth, redirectTo) {
    function AuthenticatedComponent(props) {
        const { isAuthenticated } = useAuth();
        const auth = isAuthenticated();
        const redirectPath = redirectTo ? redirectTo : "/login";

        if (!auth) {
            localStorage.setItem('route-auth-message','you must be logged in to view this page');

            return (
                <Redirect to={ redirectPath } />
            )
        }

        return (  
            <Component { ...props }/>
        )    
    }
    
    return AuthenticatedComponent;
}