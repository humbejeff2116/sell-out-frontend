
import React, { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { BiMenu } from "react-icons/bi";
import Links from '../../../Data/links';
import fling from '../../../Images/fling8.png';
import './header.css';

const landingMainLinks = Links.getLandingMainLinks();

export default function Header({ stickToTop, showLogin, ...props }) {
    const [scrolled, setScrolled] = useState(false);
    useEffect(()=> {
        window.addEventListener('scroll', handleScroll);
        return ()=> {
            window.removeEventListener('scroll', handleScroll);
        }
    });

    const handleScroll = ( ) => {
        const offset = window.scrollY;
        if (offset > 50) {
           setScrolled(true)
        } else {
           setScrolled(false)
        }
    }

    const headerClassName = stickToTop && scrolled ? (
        "landing-header scrolled"
    ) : (
        "landing-header"
    )
   
    return (
        <header className={headerClassName}>
            <div className="landing-header-logo">
                <div  className="landing-header-logo-img">
                    <Link to="/">
                        <img src={ fling } alt="Fling"/>
                    </Link>
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
                    <button onClick={ showLogin }>Login</button>
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
            // title={ name } 
            >
                { name } 
            </NavLink> 
        </div>
        
    ) 
}