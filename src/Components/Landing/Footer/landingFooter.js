import React from 'react';
import { Link } from 'react-router-dom';
import Links from '../../../Data/links';
import Freefall from '../../../Images/Logos/free_fall1.svg';
import './landingFooter.css';

const landingSocialLinks = Links.getFooterSocialLinks();

const footerMainLinks = [
    {
        headerText: 'Freefall',
        links: [
            {name: 'About', href: '/#'}, 
            {name: 'Investors', href: '/#'}, 
            {name: 'Jobs', href: '/#'}
        ]
    },
    {
        headerText: 'Resources',
        links: [
            {name: 'Community', href: '/#'}, 
            {name: 'Blog', href: '/#'}, 
            {name: 'Support', href: '/#'}
        ]
    },
    {
        headerText: 'Policies',
        links: [
            {name: 'Terms', href: '/#'}, 
            {name: 'Privacy', href: '/#'}, 
            {name: 'Cookies', href: '/#'}
        ]
    },
    {
        headerText: 'Help',
        links: [
            {name: 'Using Freefall', href: '/#'}, 
            {name: 'Manage Account', href: '/#'}, 
            {name: 'Contact Us', href: '/#'}
        ]
    }
]

export default function LandingFooter({ 
    footerClassName, 
    ...props 
}) {
    return (
        <footer className = { footerClassName ? footerClassName : 'landing-footer-container' }>
            <div className="landing-footer-top">
                <div className="landing-footer-top-left">
                    <div className="landing-footer-logo">
                        <Link to="/">
                            <img src = { Freefall } alt="Freefall"/>
                        </Link>
                    </div>
                    <div className="landing-footer-logo-text">
                        A marketplace built for you.
                    </div>
                    {/* social */}
                    <section className="landing-footer-social-section">
                        <nav className="landing-footer-social-nav" >              
                        {landingSocialLinks.map((link, i) =>
                            <SocailLinks  key={i} {...link}/>
                        )}
                        </nav>
                    </section>
                </div>
                <div className="landing-footer-top-right">
                {footerMainLinks.map((link, i) =>
                    <FooterNavLinks { ...link } key = { i }/> 
                )}
                </div>
            </div>
            <div className="landing-footer-bottom">
                <section className="landing-footer-bottom-child">
                    <a href='/#'>&copy;{ new Date().getFullYear() } @jeff.codes</a>  
                </section>
                <section className="landing-footer-bottom-child">
                    <a href="/humbe-jeffrey.netlify.app" target="_blank">Developed by Humbe Jeffrey</a>
                </section>
            </div>
        </footer>
    )
}

function FooterNavLinks({ 
    headerText, 
    links
}) {
    return (
        <div className="landing-footer-main-content">
            <div className="landing-footer-content-header">{ headerText }</div>
            <ul>
            {links.map((link, i) => 
                <FooterLinks { ...link } key = { i }/>
            )}
            </ul>
        </div>
    )
}

function FooterLinks({ name, href }) {
    return (
        <li>
            <a href = { href }>{ name }</a>
        </li>
    )
}

function SocailLinks({ 
    href, 
    title, 
    icon
}) {
    return (
        <div className="landing-footer-social-item">
            <Link 
            to = { href } 
            title = { title } 
            className="landing-footer-social-link"
            >  
            <i>{ icon }</i> 
            </Link>
        </div> 
    )
}