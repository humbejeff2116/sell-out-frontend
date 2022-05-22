
import React from 'react';
import Header from '../Header/header';
import Footer from '../Footer/footer';
import LeftSideBar from '../LeftSideBar/leftSideBar';
import RightSideBar from '../RightSideBar/rightSideBar';
import LandingFooter from '../Landing/Footer/landingFooter';
import ProfileAvatar from '../Profile/profileAvatar';
import IndexSideNav from '../IndexSideNav/indexSideNav';
import IndexFooter from '../IndexFooter/indexFooter';
import Notifications from '../NotificationsDropdown/notifications';
import Connections from '../Connections/connections';
import GettingStartedSideNav from '../GettingStartedSideNav/gettingStartedSideNav';
import RequireAuthentication from '../Authentication/requireAuthentication';
import Links from '../../Data/links';
import fling from '../../Images/fling8.png';
import './template.css';

const settingsSideNavLinks = Links.getSettingsSideNavLinks();
const settingsSideNavFooterLinks = Links.getSettingsSideNavFooterLinks();
const gettingStartedSideNavLinks = Links.getGettingStartedSideNavLinks();


export  function IndexPageTemplateComp({ leftSideBarTop, leftSideBarCenter, leftSideBarBottom, children, ...props }) {

    return (
        <>
            <Header/>
            <div className="inside-login-template-panel">
                <LeftSideBar 
                fixed={ true }
                top={ leftSideBarTop ? leftSideBarTop : <ProfileAvatar/> } 
                center={ leftSideBarCenter ? leftSideBarCenter : <IndexSideNav/> } 
                bottom={ leftSideBarBottom ? leftSideBarBottom : <IndexFooter /> } 
                />
                { children }
            </div>
        </>
    )
}

const IndexPageTemplate = RequireAuthentication(IndexPageTemplateComp);

export{ IndexPageTemplate };

export function IndexTemplateChildrenWithRightSideBar({ children, rightSideBarTop, rightSideBarBottom, ...props }) {
    return (
        <>
            <IndexPageTemplateChildren children={ children } />
            <RightSideBar 
            topComponent={ rightSideBarTop ?  rightSideBarTop : <Notifications/> } 
            bottomComponent={ rightSideBarBottom ?  rightSideBarBottom  : <Connections/> } 
            />
        </>
    
    )
}

export function IndexTemplateChildrenWithFooterAndNoRightSideBar({ children, ...props }) {
    return (

        <div className="index-template-children-with-footer-panel">
            <SettingsTemplateChildren children={ children } />
            <LandingFooter footerClassName={'gettingStarted-footer'} />
        </div>

    )
}


export default function Template({ children, ...props }) {
    return (
        <>
        <Header/>
        <div className="template-container">
            { children }
        </div>
        <Footer/>
        </>
    )
}

export function LoginAndSignupTemplate({ children, ...props }) {
    return (
       
        <div className="login-template-container">

            <div className="login-template-left">
                <section className="login-template-logo">
                    <img src={ fling } alt="fling" />
                </section>
            </div>

            <div className="login-template-center">
                { children }
            </div>

            <div className="login-template-right">
               <section> </section>
            </div>
        </div>
    )
}


function IndexPageTemplateChildren({ children, ...props }) {
    return (
        <div className="inside-login-template-container">
            <div className="inside-login-template-center">
                { children }
            </div>
        </div>
    )
}

export function SettingsPageTemplate({ leftSideBarTop, leftSideBarCenter, leftSideBarBottom, children, ...props }) {
    return (
        <>
        <Header/>
        <LeftSideBar 
        fixed={ true }
        top={ leftSideBarTop ?  leftSideBarTop : <ProfileAvatar/> } 
        center={  leftSideBarCenter ?  leftSideBarCenter : <IndexSideNav links={settingsSideNavLinks}/> } 
        bottom={ leftSideBarBottom ?  leftSideBarBottom : <IndexFooter links ={settingsSideNavFooterLinks}/> } 
        />
        <SettingsTemplateChildren children={ children } />
        <LandingFooter footerClassName={'gettingStarted-footer'} />
        </>
    )
}

function SettingsTemplateChildren({ children, ...props }) {
    return (
        <div className="settings-template-container">
            <div className="settings-template-center">
                { children }
            </div>
            
        </div>
    )
}

export function GettingStartedTemplate({ leftSideBarTop, leftSideBarCenter, leftSideBarBottom, children, ...props }) {
    return (
        <>
        <Header dontShowMainNav = {true } />
        <LeftSideBar 
        fixed={true}
        className = "getting-started-left-side-bar-container"
        top={ leftSideBarTop ?  leftSideBarTop : <ProfileAvatar/> } 
        center={ leftSideBarCenter  ?  leftSideBarCenter : <GettingStartedSideNav links ={gettingStartedSideNavLinks}/> } 
        bottom={ leftSideBarBottom ?  leftSideBarBottom : <IndexFooter/> } 
        />
        <GettingStartedTemplateChildren children={ children } />
        <LandingFooter footerClassName={'gettingStarted-footer'} />
        </>
    )
}

function GettingStartedTemplateChildren({ children,  ...props }) {
    return (
        <div className="getting-started-template-container">
            { children }
        </div>
    )
}