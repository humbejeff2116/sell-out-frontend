
import React from 'react';
import { NavLink } from 'react-router-dom';
import useNavContext from '../../Context/Navigation/context';
import Links from '../../Data/links';
import styles from './MobileNav.module.css';


const landingMobileMainLinks = Links.getLandingMobileMainLinks();

export default function MobileNav({
    links
}) {
    const { showOutsideLoginNav } = useNavContext();
    const containerClassName = `${styles.container} ${showOutsideLoginNav ? styles.show : ""}`;

    return (
        <nav className = { containerClassName }>
            <div className = { styles.wrapper }>
            {links ? links.map((link, i) =>
                <NavigationLink key = { i } { ...link }/>
            ) : (
                landingMobileMainLinks?.map((link, i) => 
                    <NavigationLink key = { i } { ...link }/>
                )
            )}
            </div>
        </nav>
    )
}


function NavigationLink({ 
    match, 
    ...props 
}) {
    const { showOutsideLoginNav, toggleOutsideLoginNav } = useNavContext();

    const closeOutsideLoginNav = () => {
        if (showOutsideLoginNav) return toggleOutsideLoginNav(false);
    }

    return (
        <div >
            <NavLink
            exact 
            onClick = { ()=> closeOutsideLoginNav() }
            to = { props.href } 
            activeClassName = { styles.activeLink }
            className = { styles.link } 
            >
                <i>{ props.icon }</i>{ props.name } 
            </NavLink> 
         </div>
    ) 
}