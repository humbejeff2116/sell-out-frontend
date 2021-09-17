


import React from 'react';
import {Link} from 'react-router-dom';
import './landingFooter.css';
import { FaTwitter,FaFacebookSquare,FaLinkedinIn,FaGithubSquare } from 'react-icons/fa';




const landingSocialLinks = [
    { name:"Li",title:"Linkedin", href:"linkedin.com/jeffrey123", icon:< FaLinkedinIn className="landing-footer-social-nav-icon"/> },
    { name:"Gi",title:"Github", href:"linkedin.com/jeffrey123", icon:< FaGithubSquare className="landing-footer-social-nav-icon"/> },
    { name:"Fa",title:"Facebook", href:"linkedin.com/jeffrey123", icon:< FaFacebookSquare className="landing-footer-social-nav-icon"/> },
    { name:"Tw",title:"Twitter", href:"linkedin.com/jeffrey123", icon:< FaTwitter className="landing-footer-social-nav-icon"/> }
]

export default function LandingFooter(props){
    return (
        <footer className ={props.footerClassName ? props.footerClassName : 'landing-footer-container'}>
            <div className="landing-footer-top">
                <section className="landing-footer-main-section">
                    <SellOut/>
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
                    <div className="landing-footer-copyright"> 
                    <div className ="landing-footer-copyright-list">
                        <span><a href="/humbe-jeffrey.netlify.app" target="_blank">Developed by Humbe Jeffrey</a></span> 
                    </div>
                    <div  className ="landing-footer-copyright-list">
                        <span><a href='/#'>&copy;{ new Date().getFullYear()} Copyright @jeff.codes</a></span>
                    </div>  
                    </div>
                </section>
            </div>
        </footer>
    )
}


function SellOut(props) {
    return (
        <div className="landing-footer-main-content">
            <span className="landing-footer-content-header">Sell out</span>
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
            <span>privacy</span>
            <span>Cookies</span>
        </div>
    )
}
function Help(props) {
    return (
        <div className="landing-footer-main-content">
             <span className="landing-footer-content-header">Help</span> 
            <span>Using Sell out</span>
            <span>Manage Account</span>
            <span>Contact us</span>
             
        </div>
    )
}




function SocailLinks(props) {
    return (
        <div className="landing-footer-social-item">
          <Link to={props.href} title={props.title} className="landing-footer-social-link">  <i>{props.icon} </i> </Link>
        </div> 
    )
}