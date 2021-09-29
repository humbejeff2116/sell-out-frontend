



import React from 'react';
import './header.css';
import { NavLink } from 'react-router-dom';
import Links, { open, close } from '../../Data/links';
import { BiSearch} from "react-icons/bi";
import './header.css';







export default function Header(props) {
    const mainLinks = Links.getMainLinks();
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