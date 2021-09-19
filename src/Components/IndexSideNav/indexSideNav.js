



import React from 'react';
import { NavLink } from 'react-router-dom';
import Links  from '../../Data/links';
import './indexSideNav.css';



export default function IndexSideNav(props) {
    const indexSideNavLinks = Links.getIndexSidenavLinks();
    return (
        <nav  className="index-side-nav">
            {
               (props.links) ? props.links.map((link, i) =>
                <NavLinks key={i} {...link} />
               ) : indexSideNavLinks.map((link, i) =>
                    <NavLinks key={i} {...link} />
                )
            }
        </nav>
    )
}

function NavLinks({ match, ...props}) {
    return (
        <div className="index-side-nav-item" >
            <NavLink
            exact 
            to={props.href} 
            activeClassName="index-side-link-active"
            className="index-side-nav-link" 
            title={props.name} >
                <i>{props.icon}</i>{props.name} 
            </NavLink> 
        </div>
    ) 
}