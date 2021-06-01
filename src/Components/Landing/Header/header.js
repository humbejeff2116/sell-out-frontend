




import React from 'react';
import { NavLink } from 'react-router-dom';
import './header.css';

const landingLinks = [
    {
        href:'',
        name:'',
        icon:''
    },
    {
        href:'',
        name:'',
        icon:''
    },
    {
        href:'',
        name:'',
        icon:''
    },
]

export default function Header(props) {
    return (
        <header className="landing-header">
            {/* logo */}
            <div className="landing-header-logo">
                logo
            </div>
            {/* main navigation */}
            <div className="landing-header-navigation">
                <nav>
                {/* {
                    props.landingLinks.map((link, i) =>
                        <NavLinks key={i} {...link} />
                    )
                } */}
                    navigation
                </nav>
            </div>
            {/* login/signup */}
            <div className="landing-header-login">
                login/signup
            </div>
        </header>
    )
}

function NavLinks(props) {
    return (
        <div className="side-nav-item" >
            <NavLink
            exact 
            to={props.href} 
            activeClassName="landing-link-active"
            className="landing-nav-link" 
            title={props.name} >
                <i>{props.icon}</i> 
            </NavLink> 
        </div>
    ) 
}