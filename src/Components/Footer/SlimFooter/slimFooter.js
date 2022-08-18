
import React from 'react';
import { RiBugFill} from 'react-icons/ri';
import styles from './SlimFooter.module.css';



const links = [
    {name: "Terms", href: "/#"},
    {name: "Privacy", href: "/#"},
    {name: "Help", href: "/#"},
    {name: "About", href: "/#"},
    {name: "Invest", href: "/#"},
    {name: "Bug", href: "/#", icon:<RiBugFill className={ styles.bugIcon }/>}
]



export default function SlimFooter({ 
    footerContainerClassName, 
    footerLinks, 
    ...props 
}) {
    return (
        <footer className ={ styles.slimFooterContainer }>
            <section className={ styles.landingFooterNavSection }>
                <nav className={ styles.landingFooterNav } >
                    <div className={ styles.landingFooterItem }>
                        <span>&copy;{ new Date().getFullYear() } @jeff.codes</span>
                    </div>              
                    {links.map((link, i) =>
                        <FooterLinks  key={i} {...link} />
                    )}    
                </nav>
            </section>
             <section className={ styles.landingFooterCountrySection }>
                <div className={ styles.landingFooterItem }>
                    <span className={ styles.flagIcon }>&#127475;&#127468;</span>
                    <span className={ styles.flagCountry }>Nigeria</span>
                </div>
            </section>     
        </footer>
    )
}


function FooterLinks({ 
    href, 
    name, 
    icon, 
    ...props 
}) {
    return (
        <div className={ `${styles.landingFooterItem} ${styles.nav}` }>
            <a href={ href }>{icon|| ""}{name}</a>
        </div>  
    )
}