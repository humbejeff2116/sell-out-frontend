




import React from 'react';
import { NavLink } from 'react-router-dom';
import Links, { open } from '../../../Data/links';
import './header.css';
const landingMainLinks = Links.getLandingMainLinks()



export default function Header(props) {
    return (
        <header className="landing-header">
            {/* logo */}
            <div className="landing-header-logo">
                <div  className="landing-header-logo-img">LOGO</div>
            </div>
            {/* main navigation */}
            <div className="landing-header-navigation">
                <nav>
                {
                    landingMainLinks.map((link, i) =>
                        <NavLinks key={i} {...link} />
                    )
                }
                </nav>
            </div>
            {/* login/signup */}
            <div className="landing-header-login">
                <div className="landing-login-item" >
                    <button onClick={()=> props.showLoginModal(true)}>Login</button>
                    <MobileNavIcon/>
                </div>
            </div>
        </header>
    )
}

export function MobileNavIcon(props) {
    return (
        <div className="landing-header-mobile-nav-container">
           {/* <div className="header-mobile-nav-search-icon">
               {open}
           </div> */}
           <div className="landing-header-mobile-nav-icon">
           {open}
           </div>
        </div>
    )
}

function NavLinks(props) {
    return (
        <div className="landing-nav-item" >
            <NavLink
            exact 
            to={props.href} 
            activeClassName="landing-nav-link-active"
            className="landing-nav-link" 
            title={props.name} >
                {props.name} 
            </NavLink> 
        </div>
    ) 
}