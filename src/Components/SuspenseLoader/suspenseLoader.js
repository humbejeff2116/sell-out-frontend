







import React from 'react';
import Template from '../Template/template';
import {LoginAndSignupTemplate} from '../Template/template';
import { IndexPageTemplate } from '../../Pages/IndexPage/indexPage';
import {SettingsPageTemplate} from '../../Pages/SettingsPage/settingsPage';
import {LandingSuspenseTemplate} from '../../Components/Landing/landing';
import { Loader } from '../Loader/loader';
import './suspenseLoader.css';




// home/index, settings, upload-product suspense
export function InsideLoginSuspenseLoader() {
    return (
       <IndexPageTemplate>
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