import React, { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { BiMenu } from "react-icons/bi";
import Links from '../../../Data/links';
import useNavContext from '../../../Context/Navigation/context';
import freeFall from '../../../Images/Logos/free_fall1.svg';
import './header.css';

const landingMainLinks = Links.getLandingMainLinks();

export default function Header({ 
    stickToTop, 
    showLogin,
    containerModificationClass,
    showBoxShadow, 
    ...props 
}) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(()=> {
        window.addEventListener('scroll', handleScroll);
        return ()=> {
            window.removeEventListener('scroll', handleScroll);
        }
    });

    const handleScroll = () => {
        const offset = window.scrollY;

        if (offset > 50) {
           setScrolled(true);
        } else {
           setScrolled(false);
        }
    }

    const headerClassName = `landing-header ${containerModificationClass || ""} ${stickToTop && (scrolled || showBoxShadow) ? "scrolled" : ""}`;
   
    return (
        <header className = { headerClassName }>
            <div className="landing-header-logo">
                <div  className="landing-header-logo-img">
                    <Link to="/">
                        <img src = { freeFall } alt="Freefall"/>
                    </Link>
                </div>
            </div>
            <div className="landing-header-navigation">
                <nav>
                {landingMainLinks.map((link, i) =>
                    <NavLinks key = { i } { ...link }/>
                )}
                </nav>
            </div>
            <div className="landing-header-login">
                <div className="landing-login-item" >
                    <button onClick = { showLogin }>Login</button>
                    <MobileNavIcon/>
                </div>
            </div>
        </header>
    )
}

export function MobileNavIcon() {
    const { showOutsideLoginNav, toggleOutsideLoginNav } = useNavContext();
    
    return (
        <div 
        className = {`landing-header-mobile-nav-icon ${showOutsideLoginNav ? "landing-header-mobile-nav-open" : ""}`}
        onClick = { toggleOutsideLoginNav }
        >
            <BiMenu className="nav-icon"/>
        </div>
    )
}

function NavLinks({ 
    href, 
    name, 
    ...props 
}) {
    return (
        <div className="landing-nav-item" >
            <NavLink
            exact 
            to = { href } 
            activeClassName="landing-nav-link-active"
            className="landing-nav-link"  
            >
                { name } 
            </NavLink> 
        </div>  
    ) 
}