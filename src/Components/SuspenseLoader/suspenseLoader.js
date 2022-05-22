
import React, { useEffect } from 'react';
import {
    LoginAndSignupTemplate, 
    GettingStartedTemplate
} from '../Template/template';
import { LandingSuspenseTemplate } from '../../Components/Landing/landing';
import { Loader } from '../Loader/loader';
import useAuth from '../../Context/context';
import './suspenseLoader.css';



export function InsideLoginSuspenseLoader() {

    useEffect(()=> {
        window.scrollTo(0,0);
    },[]);

    return (
      
        <div  className="suspense-container">
        <Loader
            loaderContainer={"index-suspense-loader-container"}
            loader={"index-suspense-loader"}
            />
        </div>

    )
}

export function SettingsSuspenseLoader(props) {
   
    return (
       
        <div  className="suspense-container">
            <Loader
            loaderContainer={"index-suspense-loader-container"}
            loader={"index-suspense-loader"}
            />
        </div>
    )

}
// outside index, about, contact etc suspense
export function OutsideLoginSuspenseLoader() {

    useEffect(()=> {
        window.scrollTo(0,0);
    },[]);

    return (
        <LandingSuspenseTemplate>
            <div  className="suspense-container">
                <Loader
                loaderContainer={"index-suspense-loader-container"}
                loader={"index-suspense-loader"}
                />
            </div>
        </LandingSuspenseTemplate>
    )
}
// login, signup suspense
export function LoginAndSignupSuspenseLoader() {

    useEffect(()=> {
        window.scrollTo(0,0);
    },[]);
    
    return (
        <LoginAndSignupTemplate>
            <div  className="suspense-container">
                <Loader
                loaderContainer={"index-suspense-loader-container"}
                loader={"index-suspense-loader"}
                />  
            </div> 
        </LoginAndSignupTemplate>
    )
}

export function GettingStartedSuspenseLoader() {
    const { isAuthenticated } = useAuth();
    const auth = isAuthenticated();

    useEffect(()=> {
        window.scrollTo(0,0);
    },[]);

    if (!auth) {
        return(
            <LoginAndSignupTemplate>
                <div  className="suspense-container">
                    <Loader
                    loaderContainer={"index-suspense-loader-container"}
                    loader={"index-suspense-loader"}
                    />  
                </div> 
            </LoginAndSignupTemplate>
        )
    }
    return (
        <GettingStartedTemplate>
            <div  className="suspense-container">
                <Loader
                loaderContainer={"index-suspense-loader-container"}
                loader={"index-suspense-loader"}
                />  
            </div> 
        </GettingStartedTemplate>
    )
}