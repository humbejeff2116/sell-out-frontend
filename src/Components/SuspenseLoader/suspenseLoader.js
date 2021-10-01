







import React, {useEffect} from 'react';
import Template from '../Template/template';
import useAuth from '../../Context/context';
import {
    LoginAndSignupTemplate, 
    IndexPageTemplate,
    SettingsPageTemplate,
    GettingStartedTemplate
 } from '../Template/template';

import {LandingSuspenseTemplate} from '../../Components/Landing/landing';
import { Loader } from '../Loader/loader';
import './suspenseLoader.css';




// home/index, settings, upload-product suspense
export function InsideLoginSuspenseLoader() {
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
       <IndexPageTemplate  rightSideBarTop={<div></div>}>
           <div  className="suspense-container">
           <Loader
            loaderContainer={"index-suspense-loader-container"}
            loader={"index-suspense-loader"}
            />
            </div>
       </IndexPageTemplate> 
    )
}

export function SettingsSuspenseLoader(props) {
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
       <SettingsPageTemplate>
           <div  className="suspense-container">
           <Loader
            loaderContainer={"index-suspense-loader-container"}
            loader={"index-suspense-loader"}
            />
            </div>
       </SettingsPageTemplate>
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