
import React from 'react';
import { Link } from 'react-router-dom';
import Links from '../../../Data/links';
import './landingFooter.css';

const landingSocialLinks = Links.getFooterSocialLinks();

export default function LandingFooter({ footerClassName, ...props }) {

    return (

        <footer className ={ footerClassName ? footerClassName : 'landing-footer-container' }>
            <div className="landing-footer-top">
                <section className="landing-footer-main-section">
                    <Fling/>
                </section>
                <section className="landing-footer-main-section">
                    <Resources/>
                </section>
                <section className="landing-footer-main-section">
                    <Policies/>
                </section>
                <section className="landing-footer-main-section">
                    <Help/>
                </section>
            </div>
            <div className="landing-footer-bottom">
                {/* social */}
                <section className="landing-footer-social-section">
                    <nav className="landing-footer-social-nav" >              
                    {
                        landingSocialLinks.map((link, i) =>

                            <SocailLinks  key={i} {...link} />

                        )
                    }
                    </nav>
                </section>
                {/* copyright */}
                <section className="landing-footer-copyright-section">
                    <div className="landing-footer-developer"> 
                        <div className ="landing-footer-developer-list">
                            <span><a href="/humbe-jeffrey.netlify.app" target="_blank">Developed by Humbe Jeffrey</a></span> 
                        </div>
                    </div>
                </section>
                <section className="landing-footer-copyright-section">
                    <div className="landing-footer-copyright"> 
                        <div  className ="landing-footer-copyright-list">
                            <span><a href='/#'>&copy;{ new Date().getFullYear() } Copyright @jeff.codes</a></span>
                        </div>  
                    </div>
                </section>
            </div>
        </footer>

    )

}


function Fling(props) {

    return (

        <div className="landing-footer-main-content">
            <span className="landing-footer-content-header">Fling</span>
            <span>About</span>
            <span>Investors </span>
            <span>Jobs</span> 
        </div>

    )

}

function Resources(props) {

    return (

        <div className="landing-footer-main-content">
            <span className="landing-footer-content-header">Resources</span>
            <span>Community</span>
            <span>Blog</span>
            <span>Support</span>
        </div>

    )

}

function Policies(props) {

    return (

        <div className="landing-footer-main-content">
            <span className="landing-footer-content-header">Policies</span>
            <span>Terms</span>
            <span>Privacy</span>
            <span>Cookies</span>
        </div>

    )

}

function Help(props) {

    return (

        <div className="landing-footer-main-content">
            <span className="landing-footer-content-header">Help</span> 
            <span>Using Fling</span>
            <span>Manage Account</span>
            <span>Contact Us</span>    
        </div>

    )

}

function SocailLinks({ href, title, icon, ...props }) {

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