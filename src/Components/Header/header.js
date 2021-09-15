



import React from 'react';
import './header.css';
import { NavLink } from 'react-router-dom';

import {BiHome, BiUser, BiFolder} from "react-icons/bi";
import {RiBookOpenLine} from "react-icons/ri";


const mainLinks = [
    { name: "Home", href: "/home", icon: <BiHome className="nav-icon" /> },
    { name: "About", href: "/about", icon: <BiUser className="nav-icon"/> },
    { name: "Community", href: "/community", icon: <RiBookOpenLine className="nav-icon"/> },
    { name: "Support", href: "/support", icon: <BiFolder className="nav-icon"/> },
]

function setUnicode(unicode) {
    let dummy;
    let decoded;
    if(!unicode){
        return decoded ="";
    }
    dummy = document.createElement('textarea');
    dummy.innerHTML = unicode;
    decoded = dummy.value;
    return decoded;
}

const open = setUnicode('&#9776;')
const close = setUnicode('&times;')





export default function Header(props) {
    return (
        <header className="header-container" >
            <section className="header-logo">
                <div className="header-logo-img">LOGO</div>
            </section>
            <section className="header-main-navigation">
               { (props.dontShowMainNav) ? '' : <MainNavigation mainLinks={mainLinks}/> }
            </section>
            <section className="header-search-bar">
                <SearchBar/>
            </section>
        </header>
    )
}
function SearchBar(props) {
    return (
        <div className="header-search-bar-form-panel">
            <form>
                <input type="search" placeholder="search for products" /><button>Search</button>
            </form>
            <MobileNavIcon/>
        </div>
    )
}
function MobileNavIcon(props) {
    return (
        <div className="header-mobile-nav-container">
           {/* <div className="header-mobile-nav-search-icon">
               {open}
           </div> */}
           <div className="header-mobile-nav-icon">
           {open}
           </div>
        </div>
    )
}
function MainNavigation(props) {
    return (
        <nav>
        {
            props.mainLinks.map((link, i) =>
                <NavLinks key={i} {...link} />
            )
        }
        </nav>
    )
}

function NavLinks(props) {
    return (
        <div className="main-nav-item" >
            <NavLink
            exact 
            to={props.href} 
            activeClassName="main-nav-link-active"
            className="main-nav-link" 
            title={props.name} >
                <i>{props.icon}</i> 
            </NavLink> 
        </div>
    ) 
}