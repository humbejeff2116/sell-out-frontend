





import React from 'react';
import {Redirect} from 'react-router-dom';
import useAuth from '../../Context/context';



export default function RequireAuthentication(Component, auth) {
    
    function AuthenticatedComponent(props) {
        const { isAuthenticated } = useAuth();
            const auth = isAuthenticated();

            if (!auth) {
                localStorage.setItem('route-auth-message','you must be logged in to view this page');
                return(
                   <Redirect to='/login' />
                )
            }
            return(  
                <Component {...props}/>
            )
    }
    
    return AuthenticatedComponent;
}
