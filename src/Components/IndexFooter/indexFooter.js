





import React from 'react';
import { NavLink } from 'react-router-dom';
import {BiHome, BiUser} from "react-icons/bi";
import {RiBookOpenLine } from "react-icons/ri";
import './indexFooter.css';

const indexFooterLinks = [
    { name: "Support/Help", href: "/", icon: <BiHome className="index-side-nav-icon" /> },
    { name: "Settings", href: "/about", icon: <BiUser className="index-side-nav-icon"/> },
    { name: "Logout", href: "/community", icon: <RiBookOpenLine className="index-side-nav-icon"/> }
]

export default function IndexFooter(props) {
    return (
        <div className="index-footer">
            {
                indexFooterLinks.map((link, i) =>
                    <NavLinks key={i} {...link} />
                )
            }
        </div>
    )
}


function NavLinks(props) {
    return (
        <div className="index-footer-item" >
            <NavLink
            exact 
            to={props.href} 
            activeClassName="index-footer-active"
            className="index-footer-link" 
            title={props.name} >
                <i>{props.icon}</i>{props.name} 
            </NavLink> 
        </div>
    ) 
}