
import React from 'react';
import { NavLink } from 'react-router-dom';
import useNavContext from '../../Context/Navigation/context';
import Links  from '../../Data/links';
import './indexFooter.css';


const indexSideNavFooterLinks = Links.getIndexSideNavFooterLinks();
export default function IndexFooter(props) {
    return (
        <div className="index-footer">
        {(props.links) ? props.links.map((link, i) =>
            <NavLinks key={i} {...link} />
        ) : indexSideNavFooterLinks.map((link, i) =>
            <NavLinks key={i} {...link} />
        )}
        </div>
    )
}


function NavLinks({
    href, 
    name,
    icon, 
    ...props
}) {
    const { showLeftSideBar, openLeftSideBar } = useNavContext();

    const closeLeftSideBar = () => {
        if (showLeftSideBar) return openLeftSideBar(false);
    }
    return (
        <div className="index-footer-item" >
            <NavLink
            exact 
            onClick={()=> closeLeftSideBar()}
            to={href} 
            activeClassName="index-footer-link-active"
            className="index-footer-link" 
            title={name} >
                <i>{icon}</i>{name} 
            </NavLink> 
        </div>
    ) 
}