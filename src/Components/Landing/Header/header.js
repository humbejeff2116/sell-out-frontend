
import React from 'react';
import { NavLink } from 'react-router-dom';
import { BiMenu } from "react-icons/bi";
import Links from '../../../Data/links';
import fling from '../../../Images/fling8.png';
import './header.css';

const landingMainLinks = Links.getLandingMainLinks();

export default function Header({ showLoginModal, ...props }) {
   
    return (
        <header className="landing-header">
            <div className="landing-header-logo">
                <div  className="landing-header-logo-img">
                    <img src={ fling } alt="fling" />
                </div>
            </div>
            <div className="landing-header-navigation">
                <nav>
                {
                    landingMainLinks.map((link, i) =>

                        <NavLinks key={ i } { ...link }/>

                    )
                }
                </nav>
            </div>
            <div className="landing-header-login">
                <div className="landing-login-item" >
                    <button onClick={ ()=> showLoginModal(true) }>Login</button>
                    <MobileNavIcon/>
                </div>
            </div>
        </header>
    )
}

export function MobileNavIcon({ ...props }) {
    return (

        <div className="landing-header-mobile-nav-container">
            <div className="landing-header-mobile-nav-icon">
                <BiMenu className="nav-icon"/>
            </div>
        </div>

    )
}

function NavLinks({ href, name, ...props }) {
    return (
        <div className="landing-nav-item" >
            <NavLink
            exact 
            to={ href } 
            activeClassName="landing-nav-link-active"
            className="landing-nav-link" 
            title={ name } 
            >
                { name } 
            </NavLink> 
        </div>
    ) 
}