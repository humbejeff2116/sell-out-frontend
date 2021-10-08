




import React from 'react';
import useViewContext from '../../Context/viewContext/context';
import {  Redirect } from 'react-router-dom';

export default function  RequireViewStateAuthentication(RequireAuthentication, Component) {

    function AuthenticatedComponent(props) {
        const {viewState} = useViewContext();
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