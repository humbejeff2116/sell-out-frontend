





import React from 'react';
import {Redirect} from 'react-router-dom';



export default function RequireAuthentication(Component, auth) {
    class AuthenticatedComponent extends React.Component {
        render() {
            const isAuthenticated = auth();
            if (!isAuthenticated) {
                localStorage.setItem('route-auth-message','you must be logged in to view this page');
                return(
                   <Redirect to='/login' />
                )
            }
            return(  
                <Component {...this.props}/>
            )
        }
    }
    return AuthenticatedComponent;
}
