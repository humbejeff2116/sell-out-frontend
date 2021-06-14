




import React from 'react';
import { NavLink } from 'react-router-dom';

import {BiHome, BiUser, BiFolder} from "react-icons/bi";
import {RiBookOpenLine, RiContactsBookLine} from "react-icons/ri";
import './header.css';

const landingMainLinks = [
    { name: "Home", href: "/", icon: <BiHome className="nav-icon" /> },
    { name: "About", href: "/about", icon: <BiUser className="nav-icon"/> },
    { name: "Community", href: "/community", icon: <RiBookOpenLine className="nav-icon"/> },
    { name: "Support", href: "/support", icon: <BiFolder className="nav-icon"/> },
    { name: "Contact", href: "/contact", icon: <RiContactsBookLine className="nav-icon"/> }
]


export default function Header(props) {
    return (
        <header className="landing-header">
            {/* logo */}
            <div className="landing-header-logo">
                <div  className="landing-header-logo-img">logo</div>
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
                </div>
            </div>
        </header>
    )
}

function NavLinks(props) {
    return (
        <div className="landing-nav-item" >
            <NavLink
            exact 
            to={props.href} 
            activeClassName="landing-link-active"
            className="landing-nav-link" 
            title={props.name} >
                <i>{props.icon}</i>{props.name} 
            </NavLink> 
        </div>
    ) 
}