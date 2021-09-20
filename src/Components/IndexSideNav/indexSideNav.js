



import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Links  from '../../Data/links';
import './indexSideNav.css';

const accordionLinks = [
    {
        accordion: true,
        name:"Orders", 
        links: [
            {href:"/home/orders/recieved-orders", name:"Recieved orders", icon:""},
            {href:"/home/orders/placed-orders", name:"Placed orders", icon:""},
            {href:"/home/orders/confirm-delivery", name:"Confirm delivery", icon:""},
            {href:"/home/orders/delivered-products", name:"Delivered products", icon:""},
        ]
    }
]

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
            {
                props.accordion ? (
                    <Accordion {...props}/> 
                ) : (
                    <NavLink
                    exact 
                    to={props.href} 
                    activeClassName="index-side-link-active"
                    className="index-side-nav-link" 
                    title={props.name} >
                        <i>{props.icon}</i>{props.name} 
                    </NavLink> 
                )
            }
            
        </div>
    ) 
}

function Accordion(props) {
    const [showAccordion, setShowAccordion] = useState(false);

    const toggleAccordion = () => {
        setShowAccordion(state => !state);
    }
    return (
        <div className="index-side-nav-accordion-cntr">
            <button onClick={ toggleAccordion }>{props.name}</button>
            {
                showAccordion && (
                    props.links.map((link, i) =>
                        <div>
                            <NavLinks key={i} {...link} />
                        </div>
                    )
                )
            }
        </div>
    )
}