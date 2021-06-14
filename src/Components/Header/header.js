



import React from 'react';
import './header.css';
import { NavLink } from 'react-router-dom';

import {BiHome, BiUser, BiFolder} from "react-icons/bi";
import {RiBookOpenLine} from "react-icons/ri";


const mainLinks = [
    { name: "Home", href: "/", icon: <BiHome className="nav-icon" /> },
    { name: "About", href: "/about", icon: <BiUser className="nav-icon"/> },
    { name: "Community", href: "/community", icon: <RiBookOpenLine className="nav-icon"/> },
    { name: "Support", href: "/support", icon: <BiFolder className="nav-icon"/> },
]




export default function Header(props) {
    return (
        <header className="header-container" >
            <section className="header-logo">
                <div className="header-logo-img">logo</div>
            </section>
            <section className="header-main-navigation">
                <MainNavigation mainLinks={mainLinks}/>
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
                <input type="search" placeholder="search for products or services" /><button>Search</button>
            </form>
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
            activeClassName="main-link-active"
            className="main-nav-link" 
            title={props.name} >
                <i>{props.icon}</i> 
            </NavLink> 
        </div>
    ) 
}