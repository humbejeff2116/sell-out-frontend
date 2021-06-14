


import React from 'react';
import { NavLink } from 'react-router-dom';
import {BiHome, BiUser, BiFolder} from "react-icons/bi";
import {RiBookOpenLine, RiContactsBookLine} from "react-icons/ri";
import './settingsSideNav.css';

const landingMainLinks = [
    { name: "Account", href: "/", icon: <BiHome className="index-side-nav-icon" /> },
    { name: "Connections", href: "/about", icon: <BiUser className="index-side-nav-icon"/> },
    { name: "Community", href: "/community", icon: <RiBookOpenLine className="index-side-nav-icon"/> },
    { name: "Activity", href: "/support", icon: <BiFolder className="index-side-nav-icon"/> },
    { name: "Blog", href: "/support", icon: <BiFolder className="index-side-nav-icon"/> },
    { name: "Service", href: "/support", icon: <RiContactsBookLine className="index-side-nav-icon"/>},
]


export default function SettingsSideNav(props) {
    return (
        <nav  className="settings-side-nav">
            {
                landingMainLinks.map((link, i) =>
                    <NavLinks key={i} {...link} />
                )
            }
        </nav>
    )
}


function NavLinks(props) {
    return (
        <div className="settings-side-nav-item" >
            <NavLink
            exact 
            to={props.href} 
            activeClassName="settings-side-link-active"
            className="settings-side-nav-link" 
            title={props.name} >
                <i>{props.icon}</i>{props.name} 
            </NavLink> 
        </div>
    ) 
}