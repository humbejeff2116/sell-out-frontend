
import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useGetStartedContext } from '../../Context/context';
import { IoMdCheckmarkCircle } from 'react-icons/io';
import './gettingStartedSideNav.css';


export default function GettingStartedSideNav(props) {

    return (

        <nav  className="getting-started-side-nav">
        {
            props?.links?.map((link, i) =>

                <GettingStartedNavLink key={i} {...link} />

            )
        }
        </nav>

    )

}

function GettingStartedNavLink({ match, ...props}) {

    const { submittedFormPaths } = useGetStartedContext();

    const linkClassName = useRef("getting-started-side-nav-link");

    useEffect(()=> {
       
        const setLinkClassName = (submittedFormPaths) => {

            linkClassName.current = "getting-started-side-nav-link";

            if (submittedFormPaths.length < 1) {

                linkClassName.current = "getting-started-side-nav-link";

                return;
                
            }

            submittedFormPaths.forEach(path => {

                if (path.href === props.href) {

                    assignClassName(path.href)

                } 
                
            })

            function assignClassName(href) {

                linkClassName.current = "getting-started-side-nav-link form-data-set";

            }

        }

        setLinkClassName(submittedFormPaths)

    }, [submittedFormPaths, props.href])
 
    return (

        <div className = "getting-started-side-nav-item">
            
            <NavLink
            exact 
            to = { props.href } 
            activeClassName="getting-started-side-link-active"
            className = { linkClassName.current } 
            >
            <i>
            {
                linkClassName.current === "getting-started-side-nav-link form-data-set" ?
                <IoMdCheckmarkCircle  className = "getting-started-side-nav-icon"/> : props.icon
            }
            </i>
            { props.name } 
            </NavLink> 

        </div>

    ) 

}