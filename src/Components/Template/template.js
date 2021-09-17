





import React from 'react';
import Header from '../Header/header';
import Footer from '../Footer/footer';
import LeftSideBar from '../LeftSideBar/leftSideBar';
import RightSideBar from '../RightSideBar/rightSideBar';
import LandingFooter from '../Landing/Footer/landingFooter';
import './template.css';


export default function Template(props) {
    return (
        <>
        <Header/>
        <div className="template-container">
            {props.children}
        </div>
        <Footer/>
        </>
    )
}

export function LoginAndSignupTemplate(props) {
    return (
       
        <div className="login-template-container">

            <div className="login-template-left">
                <section className="login-template-logo">LOGO</section>
            </div>

            <div className="login-template-center">
                {props.children}
            </div>

            <div className="login-template-right">
               <section> </section>
            </div>
        </div>
    )
}

export function InsideLoginTemplate(props) {
    return (
        <>
        <Header/>
        <div className="inside-login-template-panel">
        <LeftSideBar 
        fixed={true}
        top={props.leftSideBarTop} 
        center={props.leftSideBarCenter} 
        bottom={props.leftSideBarBottom} 
        />
        <InsideLoginTemplateChildren children={props.children} />
        <RightSideBar topComponent={props.rightSideBarTop} bottomComponent={props.rightSideBarBottom} />

        </div>
       
        </>
    )
}

function InsideLoginTemplateChildren(props) {
    return (
        <div className="inside-login-template-container">
            <div className="inside-login-template-center">
                {props.children}
            </div>
            
        </div>
    )

}

export function SettingsTemplate(props) {
    return (
        <>
        <Header/>
        <LeftSideBar 
        fixed={true}
        top={props.leftSideBarTop} 
        center={props.leftSideBarCenter} 
        bottom={props.leftSideBarBottom} 
        />
        <SettingsTemplateChildren children={props.children} />
        <LandingFooter footerClassName={'gettingStarted-footer'} />
        </>
    )
}
function SettingsTemplateChildren(props) {
    return (
        <div className="settings-template-container">
            <div className="settings-template-center">
                {props.children}
            </div>
            
        </div>
    )

}

export function GettingStartedTemplate(props) {
    return (
        <>
        <Header dontShowMainNav={true}/>
        <LeftSideBar 
             fixed={true}
            top={props.leftSideBarTop} 
            center={props.leftSideBarCenter} 
            bottom={props.leftSideBarBottom} 
            />
        <GettingStartedTemplateChildren
        children={props.children} />
        <LandingFooter footerClassName={'gettingStarted-footer'} />
       
        </>
    )
}

function GettingStartedTemplateChildren(props) {
    return (
        <div className="getting-started-template-container">
            {props.children}
        </div>
    )

}