/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link, Redirect, useLocation, useHistory } from 'react-router-dom';
import Header from '../Header/header';
import Footer from '../Footer/footer';
import LeftSideBar from '../LeftSideBar/leftSideBar';
import RightSideBar from '../RightSideBar/rightSideBar';
import LandingFooter from '../Landing/Footer/landingFooter';
// import LandingHeader from '../Landing/Header/header';
import ProfileAvatar from '../Profile/profileAvatar';
import IndexSideNav from '../IndexSideNav/indexSideNav';
import IndexFooter from '../IndexFooter/indexFooter';
import SlimFooter from '../Footer/SlimFooter/slimFooter'
import Notifications from '../NotificationsDropdown/notifications';
import Connections from '../Connections/connections';
import BottomNavigation from '../BottomNavigation/bottomNavigation';
// import MobileNav from '../OutsideLoginMobileNav/mobileNav';
import GettingStartedSideNav from '../GettingStartedSideNav/gettingStartedSideNav';
import RequireAuthentication from '../Authentication/requireAuthentication';
import { LoginAndSignupFooter } from '../Footer/footer';
import useAuth from '../../Context/context';
import Links from '../../Data/links';
import freefall from '../../Images/Logos/free_fall1.svg';
import birdsBackground from '../../Images/Illustrations/IRA/bg-23.svg';
import styles from './Template.module.css';
import './template.css';

const settingsSideNavLinks = Links.getSettingsSideNavLinks();
const settingsSideNavFooterLinks = Links.getSettingsSideNavFooterLinks();
const gettingStartedSideNavLinks = Links.getGettingStartedSideNavLinks();


export  function IndexPageTemplateComp({ 
    leftSideBarTop, 
    leftSideBarCenter, 
    leftSideBarBottom, 
    children, 
    ...props 
}) {

    return (
        <>
            <Header/>
            <div className="inside-login-template-panel">
                <LeftSideBar 
                fixed
                top = { leftSideBarTop ? leftSideBarTop : <ProfileAvatar/> } 
                center = { leftSideBarCenter ? leftSideBarCenter : <IndexSideNav/> } 
                bottom = { leftSideBarBottom ? leftSideBarBottom : <IndexFooter /> } 
                />
                { children }
            </div>
            <BottomNavigation/>
        </>
    )
}

const IndexPageTemplate = RequireAuthentication(IndexPageTemplateComp);
export{ IndexPageTemplate };

export function IndexTemplateChildrenWithRightSideBar({ 
    children, 
    rightSideBarTop, 
    rightSideBarBottom, 
    ...props 
}) {
    return (
        <>
            <IndexPageTemplateChildren>
                { children }
            </IndexPageTemplateChildren>
            <RightSideBar 
            topComponent = { rightSideBarTop ? rightSideBarTop : <Notifications/> } 
            bottomComponent = { rightSideBarBottom ? rightSideBarBottom : <Connections/> } 
            />
        </>
    )
}

export function IndexTemplateChildrenWithFooterAndNoRightSideBar({ children, ...props }) {
    return (
        <div className="index-template-children-with-footer-panel">
            <SettingsTemplateChildren>
                { children }
            </SettingsTemplateChildren>
            <SlimFooter/>
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


const footerLinks = [
    {id: '1', name: 'Terms', href: '/#'},
    {id: '2', name: 'Privacy', href: '/#'},
    {id: '3', name: 'About', href: '/#'},
    {id: '3', name: 'Invest', href: '/#'}
]

export function LoginAndSignupTemplate({
    stickHeaderToTop,
    usedInSuspenseloader,
    children, 
    ...props 
}) {
    const [redirect, setRedirect] = useState('');
    const location = useLocation();
    const history = useHistory();
    const { isAuthenticated } = useAuth();

    const goToLogin = () => {
        const userIsAuthenticated = isAuthenticated();
        
        if (userIsAuthenticated) {
            history.push(location.pathname);
            setRedirect('/home');
            return;
        }

        if (location.pathname === '/login') {
            return;
        }

        history.push(location.pathname);
        setRedirect('/login');
    }

    if (redirect) {
        return (
            <Redirect to = { redirect }/>
        )
    }

    return (
        <div className="login-template-container">
            <LoginAndSignupBackgroundImages/>
            <div className="login-template-child-wrapper">
            {usedInSuspenseloader ? (
                children
            ) : (
                <div className="login-template-top">
                    <section className="login-template-logo">
                        <div className="login-template-logo-img">
                            <Link to="/">
                                <img src = { freefall } alt="Freefall"/>
                            </Link>
                        </div>
                    </section>
                    <div className="login-template-center">
                        { children }
                    </div>
                </div>
            )}    
            <div className="login-template-bottom">
                <LoginAndSignupFooter links = { footerLinks }/>
            </div>
            </div>
        </div>
    )
}

function LoginAndSignupBackgroundImages() {
    return (
        <div className = { styles.loginBackgrndImagesContr } aria-hidden="true">
            <img 
            className = { styles.loginBackgrndImageRight }
            src = { birdsBackground } 
            alt=""
            />
            <img 
            className = { styles.loginBackgrndImageLeft }
            src = { birdsBackground } 
            alt=""
            />
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

export function SettingsPageTemplate({ 
    leftSideBarTop, 
    leftSideBarCenter, 
    leftSideBarBottom, 
    children, 
    ...props 
}) {
    return (
        <>
            <Header/>
            <LeftSideBar 
            fixed
            top = { leftSideBarTop ?  leftSideBarTop : <ProfileAvatar/> } 
            center = { leftSideBarCenter ? leftSideBarCenter : <IndexSideNav links = { settingsSideNavLinks }/> } 
            bottom = { leftSideBarBottom ? leftSideBarBottom : <IndexFooter links = { settingsSideNavFooterLinks }/> } 
            />
            <SettingsTemplateChildren>
                { children }
            </SettingsTemplateChildren>
            <LandingFooter footerClassName = { 'gettingStarted-footer' }/>
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

export function GettingStartedTemplate({ 
    leftSideBarTop, 
    leftSideBarCenter, 
    leftSideBarBottom, 
    children, 
    ...props 
}) {
    return (
        <>
            <Header dontShowMainNav/>
            <LeftSideBar 
            fixed
            // className = "getting-started-left-side-bar-container"
            top = { leftSideBarTop ? leftSideBarTop : <ProfileAvatar/> } 
            center = { leftSideBarCenter  ? leftSideBarCenter : <GettingStartedSideNav links = { gettingStartedSideNavLinks }/> } 
            bottom = { leftSideBarBottom ? leftSideBarBottom : <IndexFooter/> } 
            />
            <GettingStartedTemplateChildren>
                { children }
            </GettingStartedTemplateChildren>
            <LandingFooter footerClassName='getting-started-footer'/>
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