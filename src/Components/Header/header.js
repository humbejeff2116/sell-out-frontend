
import React, { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { BiSearch, BiMenu } from "react-icons/bi";
import { NotificationAlert } from '../NotificationsDropdown/notifications';
import useCartContext from '../../Context/Cart/cartContext';
import Links from '../../Data/links';
import fling from '../../Images/fling8.png';
import './header.css';


export default function Header({ dontShowMainNav, ...props }) {

    const mainLinks = useRef(Links.getMainLinks());

    return (
        <header className="header-container" >
            <section className="header-logo">
                <div className="header-logo-img"><img src={ fling } alt="fling"/></div>
            </section>
            <section className="header-main-navigation">
            { 
                (dontShowMainNav) ? '' : ( 

                    <MainNavigation mainLinks={ mainLinks.current }/>

                ) 
            }
            </section>
            <section className="header-search-bar">
                <SearchBar/>
            </section>
        </header>
    )
}

function SearchBar(props) {
    return (
        <div className="header-search-bar-form-panel">
            <form>
                <input type="search" placeholder="search for products" />
                <button>
                   <BiSearch className="nav-icon"/>
                </button>
            </form>
            <MobileNavIcon/>
        </div>
    )
}

 function MobileNavIcon(props) {
    return (
        <div className="header-mobile-nav-container">
            <div className="header-mobile-nav-icon">
                <BiMenu className="nav-icon"/>
            </div>
        </div>
    )
}

function MainNavigation({ mainLinks, ...props }) { 
    return (
        <nav>
        {
            mainLinks?.map((link, i) =>

                <NavLinks key = { i } { ...link } />

            )
        }
        </nav>
    )
}

function NavLinks({ name, href, icon, ...props }) {

    const {  cartTotalNumberOfProducts } = useCartContext();

    let Component;

    if (name.toLowerCase() === "cart") {

        Component = (
            <div className="main-nav-item" >
                {
                    cartTotalNumberOfProducts > 0  && ( 

                        <NotificationAlert className="header-notifications-icon-alert"/> 

                    )
                }
                <NavLink
                exact 
                to={ href } 
                activeClassName="main-nav-link-active"
                className="main-nav-link" 
                title={ name } 
                >
                    <i>{ icon }</i> 
                </NavLink> 
            </div>
        )

    } else if (name.toLowerCase() === "orders") {

        // TODO... implement new order alert functionality
        Component = (
            <div className="main-nav-item" >
                <NavLink
                exact 
                to={ href } 
                activeClassName="main-nav-link-active"
                className="main-nav-link" 
                title={ name } 
                >
                    <i>{ icon }</i> 
                </NavLink> 
            </div>
        )

    } else {

        Component = (
            <div className="main-nav-item" >
                <NavLink
                exact 
                to={ href } 
                activeClassName="main-nav-link-active"
                className="main-nav-link" 
                title={ name } 
                >
                    <i>{ icon }</i> 
                </NavLink> 
            </div>
        )

    }
    
    return (
        <>
        { Component }
        </>
    ) 
}