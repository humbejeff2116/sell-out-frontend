
import React from 'react';
import useViewContext from '../../Context/viewContext/context';
import {  Redirect } from 'react-router-dom';

export default function  RequireViewStateAuthentication(RequireAuthentication, Component) {

    function AuthenticatedComponent(props) {

        const { viewState } = useViewContext();

        let AuthComponent = RequireAuthentication(Component);
        
        if (!viewState) {

            return (

                <Redirect to='/home' />

            ) 

        }

        return (

           <AuthComponent {...props} />

        )

    }

    return AuthenticatedComponent;
    
}


export function  RequireGettingStartedAuthentication(RequireAuthentication, Component, redirectTo) {

    function AuthenticatedComponent(props) {

        const { user, canAccessGettingStarted } =  sessionStorage.getItem('access-getting-started') ? JSON.parse(sessionStorage.getItem('access-getting-started')) : {}

        const AuthComponent = RequireAuthentication(Component);

        const redirectPath = redirectTo ? redirectTo : "/home";
        
        if (!canAccessGettingStarted  || !user) {

            return (

                <Redirect to = { redirectPath } />

            )  

        }

        return (

           <AuthComponent {...props} />

        )

    }

    return AuthenticatedComponent;

}