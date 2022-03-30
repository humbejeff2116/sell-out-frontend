
import React, { useState } from 'react';
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

    const [accordionOpen, setAccordionOpen] = useState(false)

    const navItemClassName = accordionOpen ? "index-side-nav-item-accordion-open" : "index-side-nav-item"; 

    return (

        <div className = { navItemClassName }>
            {

                props.accordion ? (

                    <Accordion {...props} setAccordionOpen={setAccordionOpen}/> 

                ) : (

                    <NavLink
                    exact 
                    to={props.href} 
                    activeClassName="index-side-link-active"
                    className="index-side-nav-link" 
                    // title={props.name} 
                    >
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

        props.setAccordionOpen(state => !state);

    }

    const accordionClassName = showAccordion ? "index-side-nav-link active" : "index-side-nav-link";

    const accordionIconClassName = showAccordion ? "index-side-nav-link-open-icon open" : "index-side-nav-link-open-icon";
    
    let AccordionIcon;
    
    if (showAccordion) {

        AccordionIcon = <span className={accordionIconClassName } >-</span>
    
    } else {

        AccordionIcon = <span className={accordionIconClassName } >+</span>
    
    }
    
    return (
        
        <div className="index-side-nav-accordion-cntr">
            <NavLink
            exact 
            to={"#"} 
            activeClassName="index-side-link-active"
            className={accordionClassName} 
            // title={props.name} 
            onClick={toggleAccordion}
            >
                <i>{props.icon}</i>{props.name} 
                {AccordionIcon}
            </NavLink> 
            {
                showAccordion && (

                    <div className="index-side-nav-nested-items-container">
                        {
                            props.links.map((link, i) =>
                                <NavLinks  key={i}  {...link} />
                            )
                        }
                    </div>
                    
                )
            }
        </div>

    )

}