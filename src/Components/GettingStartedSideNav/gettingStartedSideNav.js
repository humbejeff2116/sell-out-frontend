
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useGetStartedContext } from '../../Context/context';
import { IoMdCheckmarkCircle } from 'react-icons/io';
import './gettingStartedSideNav.css';


export default function GettingStartedSideNav({ 
    links, 
    ...props
}) {
    const { submittedFormPaths } = useGetStartedContext();
    const submittedFormPath = (href) => {
        const formPath = submittedFormPaths?.find(path => path.href === href)
        return formPath ?  true : false;
    }

    return (
        <nav  className="getting-started-side-nav">
        {links.map((link, i) =>
            <GettingStartedNavLink 
            key={i} 
            {...link}
            submittedFormPath={submittedFormPath} 
            />
        )}
        </nav>
    )
}

function GettingStartedNavLink({ 
    match, 
    href, 
    icon, 
    name,
    submittedFormPath, 
    ...props
}) {
    const preventLinkDefaultBehaviour = (e)=> {
        e.preventDefault();
        e.stopPropagation();
    }
 
    return (
        <div className = "getting-started-side-nav-item">   
            <NavLink
            exact 
            to = {href} 
            activeClassName="getting-started-side-link-active"
            className = {` getting-started-side-nav-link ${submittedFormPath(href) ? "form-data-set" : ""}`} 
            // onClick ={preventLinkDefaultBehaviour}
            >
            <i>
            {submittedFormPath(href) ? (
                <IoMdCheckmarkCircle  className = "getting-started-side-nav-icon"/>
            ) : ( 
                icon
            )}
            </i>
            {name} 
            </NavLink> 
        </div>
    ) 
}