



import React from 'react';
import { Link } from 'react-router-dom';
import styles from './SlimFooter.module.css';



const links = [
    {name: "Terms", href: "/#"},
    {name: "Privacy Policy", href: "/#"},
    {name: "Help", href: "/#"},
    {name: "About", href: "/#"},
    {name: "Invest", href: "/#"},
    {name: "Report Bug", href: "/#"}
]



export default function SlimFooter({ footerContainerClassName, footerLinks, ...props }) {
    return (
        <footer className ={ styles.slimFooterContainer }>
            <section className={ styles.landingFooterNavSection }>
                <nav className={ styles.landingFooterNav } >
                    <div className={ styles.landingFooterItem }>
                        <span>&copy;{ new Date().getFullYear() } @jeff.codes</span>
                    </div>              
                    {
                        links.map((link, i) =>
                            <FooterLinks  key={i} {...link} />
                        )
                    }    
                </nav>
            </section>

             <section className={ styles.landingFooterCountrySection }>
                <div className={ styles.landingFooterItem }>
                    <span className={ styles.flagIcon }>&#127475;&#127468;</span>
                    <span>Nigeria</span>
                </div>
            </section>     
        </footer>
    )
}


function FooterLinks({ href, name, ...props }) {
    return (
      <div className={ `${styles.landingFooterItem} ${styles.nav}` }>
        <span><a href={ href }>{ name }</a></span>
      </div>  
    )
}