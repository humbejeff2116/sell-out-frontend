
import React, { useState, memo } from 'react';
import { NavLink } from 'react-router-dom';
import Links from '../../Data/links';
import './indexSideNav.css';


const indexSideNavLinks = Links.getIndexSidenavLinks();

export default function IndexSideNav({ links }) {
    return (
        <nav className="index-side-nav">
        {
            links ? links.map((link, i) =>
                <NavigationLink key = { i } { ...link }/>
            ) : indexSideNavLinks?.map((link, i) =>
                <NavigationLink key = { i } { ...link }/>
            )
        }
        </nav>
    )
}

function NavigationLink({ 
    match, 
    ...props 
}) {
    const [expandAccordion, setExpandAccordion] = useState(false)

    const toggleAccordion = (e) => {
        e.preventDefault();
        setExpandAccordion(state => !state);
        e.stopPropagation();
    }

    const navItemClassName = expandAccordion ? "index-side-nav-item-accordion-open" : "index-side-nav-item"; 

    return (
        <div className = { navItemClassName }>
        {
            props.accordion ? (
                <Accordion 
                {...props} 
                expandAccordion = { expandAccordion }
                toggleAccordion = { toggleAccordion }
                /> 
            ) : (
                <NavLink
                exact 
                to = { props.href } 
                activeClassName="index-side-link-active"
                className="index-side-nav-link" 
                >
                    <i>{ props.icon }</i>{ props.name } 
                </NavLink> 
            )
        }  
        </div>
    ) 
}

const Accordion = memo(({ 
    expandAccordion, 
    toggleAccordion, 
    ...props 
}) => {
    const accordionClassName = expandAccordion ? "index-side-nav-link active" : "index-side-nav-link";
    const accordionIconClassName = expandAccordion ?  "index-side-nav-link-open-icon open" : "index-side-nav-link-open-icon";
    let AccordionIcon;
    
    if (expandAccordion) {
        AccordionIcon = <span className = { accordionIconClassName }> - </span>
    } else {
        AccordionIcon = <span className = { accordionIconClassName }> + </span>
    }
    
    return (
        <div className="index-side-nav-accordion-cntr">
            <NavLink
            exact 
            to = { "#" } 
            activeClassName="index-side-link-active"
            className = { accordionClassName } 
            onClick = { toggleAccordion }
            >
                <i>{ props.icon }</i>{ props.name } { AccordionIcon }
            </NavLink> 
            {
                expandAccordion && (
                    <div className="index-side-nav-nested-items-container">
                    {
                        props.links.map((link, i) =>
                            <NavigationLink  key = { i }  { ...link }/>
                        )
                    }
                    </div>  
                )
            }
        </div>
    )
})