
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { BiSearch, BiMenu } from "react-icons/bi";
import { NotificationAlert } from '../NotificationsDropdown/notifications';
import useCartContext from '../../Context/Cart/cartContext';
import useNavContext from '../../Context/Navigation/context';
import Links from '../../Data/links';
import freeFall from '../../Images/Logos/free_fall1.svg';
import './header.css';

const mainLinks = Links.getMainLinks();

export default function Header({ 
    dontShowMainNav, 
    ...props 
}) {
    return (
        <header className="header-container">
            <section className="header-logo">
                <div className="header-logo-img">
                    <Link to="/">
                        <img src={ freeFall } alt="Freefall"/>
                    </Link>
                </div>
            </section>
            <section>
                <section className="header-main-navigation-container">
                { 
                    dontShowMainNav ? '' : ( 
                        <MainNavigation/>
                    ) 
                }
                </section>
            </section>
            <section className="header-search-bar">
                <SearchBar/>
            </section>
        </header>
    )
}

function SearchBar({
    ...props
}) {
    return (
        <div className="header-search-bar-form-panel">
            <form>
                <input type="search" placeholder="Search For Products" />
                <button>
                   <BiSearch className="header-search-icon"/>
                </button>
            </form>
            <MobileNavIcon/>
        </div>
    )
}

 function MobileNavIcon({
    ...props
}) {
    const { showLeftSideBar, openLeftSideBar } = useNavContext();
    return (
        <div className="header-mobile-nav-container">
            <div 
            className={`header-mobile-nav-icon ${ showLeftSideBar ? "header-mobile-nav-icon-open" : ""}`}
            onClick={openLeftSideBar}
            >
                <BiMenu className="nav-icon"/>
            </div>
        </div>
    )
}

export function MainNavigation({ links, ...props }) { 
    return (
        <nav className="header-main-navigation">
        {
           links ? (
                links?.map((link, i) =>
                    <NavLinks key = { i } { ...link }/>
                )
           ) : (
            mainLinks?.map((link, i) =>
                <NavLinks key = { i } { ...link }/>
            )
        ) 
        }
        </nav>
    )
}

function NavLinks({ 
    name, 
    href, 
    icon, 
    ...props 
}) {
    const {  cartTotalNumberOfProducts } = useCartContext();
    const { showLeftSideBar, openLeftSideBar } = useNavContext();

    const closeLeftSideBar = () => {
        if (showLeftSideBar) return openLeftSideBar(false);
    }

    if (name.toLowerCase() === "cart") {
        return (
            <NavLink
            exact 
            to={ href } 
            activeClassName="main-nav-link-active"
            className="main-nav-link" 
            title={ name } 
            onClick={()=> closeLeftSideBar()}
            >
            {
                cartTotalNumberOfProducts > 0  && ( 
                    <NotificationAlert className="header-notifications-icon-alert"/> 
                )
            }
            { icon } 
            </NavLink> 
        )
    } else if (name.toLowerCase() === "orders") {
        // TODO... implement new order alert functionality
        return (
            <NavLink
            exact 
            to={ href } 
            activeClassName="main-nav-link-active"
            className="main-nav-link" 
            title={ name } 
            onClick={()=> closeLeftSideBar()}
            >
                { icon } 
            </NavLink> 
        )
    } else {
        return (
            <NavLink
            exact 
            to={ href } 
            activeClassName="main-nav-link-active"
            className="main-nav-link" 
            title={ name } 
            onClick={()=> closeLeftSideBar()}
            >
                { icon }
            </NavLink> 
        )
    }
}