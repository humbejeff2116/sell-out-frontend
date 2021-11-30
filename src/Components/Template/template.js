



import React from 'react';
import Header from '../Header/header';
import Footer from '../Footer/footer';
import LeftSideBar from '../LeftSideBar/leftSideBar';
import RightSideBar from '../RightSideBar/rightSideBar';
import LandingFooter from '../Landing/Footer/landingFooter';
import ProfileAvatar from '..//Profile/profileAvatar';
import IndexSideNav from '../IndexSideNav/indexSideNav';
import IndexFooter from '../IndexFooter/indexFooter';
import Notifications from '../NotificationsDropdown/notifications';
import Connections from '../Connections/connections';
import Links from '../../Data/links';
import fling from '../../Images/fling8.png';
import './template.css';

const settingsSideNavLinks = Links.getSettingsSideNavLinks();
const settingsSideNavFooterLinks = Links.getSettingsSideNavFooterLinks();
const gettingStartedSideNavLinks = Links.getGettingStartedSideNavLinks();


export  function IndexPageTemplate(props) {
    return (
        <>
        <Header/>
        <div className="inside-login-template-panel">
        <LeftSideBar 
        fixed={true}
        top={props.leftSideBarTop ? props.leftSideBarTop : <ProfileAvatar/>} 
        center={ props.leftSideBarCenter ? props.leftSideBarCenter : <IndexSideNav/>} 
        bottom={props.leftSideBarBottom ? props.leftSideBarBottom : <IndexFooter />} 
        />
        <IndexPageTemplateChildren children={props.children} />
        <RightSideBar 
        topComponent={props.rightSideBarTop ? props.rightSideBarTop : <Notifications/>} 
        bottomComponent={props.rightSideBarBottom ? props.rightSideBarBottom  : <Connections/>} 
        />
        </div>
        </>
    )
}


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
                <section className="login-template-logo"><img src={fling} alt="fling" /></section>
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


function IndexPageTemplateChildren(props) {
    return (
        <div className="inside-login-template-container">
            <div className="inside-login-template-center">
                {props.children}
            </div>
        </div>
    )
}

export function SettingsPageTemplate(props) {
    return (
        <>
        <Header/>
        <LeftSideBar 
        fixed={true}
        top={props.leftSideBarTop ? props.leftSideBarTop : <ProfileAvatar/>} 
        center={ props.leftSideBarCenter ? props.leftSideBarCenter : <IndexSideNav links={settingsSideNavLinks}/>} 
        bottom={props.leftSideBarBottom ? props.leftSideBarBottom : <IndexFooter links ={settingsSideNavFooterLinks}/>} 
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
            top={props.leftSideBarTop ? props.leftSideBarTop : <ProfileAvatar/>} 
            center={props.leftSideBarCenter  ? props.leftSideBarCenter : <IndexSideNav links ={gettingStartedSideNavLinks}/>} 
            bottom={props.leftSideBarBottom ? props.leftSideBarCenter : <IndexFooter/>} 
            />
        <GettingStartedTemplateChildren children={props.children} />
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