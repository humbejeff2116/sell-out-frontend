





import React from 'react';
import { NavLink } from 'react-router-dom';
import Links  from '../../Data/links';
import './indexFooter.css';

export default function IndexFooter(props) {
    const indexSideNavFooterLinks = Links.getIndexSideNavFooterLinks();
    return (
        <div className="index-footer">
            {
                (props.links) ? props.links.map((link, i) =>
                    <NavLinks key={i} {...link} />
                ) : indexSideNavFooterLinks.map((link, i) =>
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
            activeClassName="index-footer-link-active"
            className="index-footer-link" 
            title={props.name} >
                <i>{props.icon}</i>{props.name} 
            </NavLink> 
        </div>
    ) 
}