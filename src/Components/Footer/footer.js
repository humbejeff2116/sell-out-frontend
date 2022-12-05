import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';


export default function Footer(props) {
    return(
        <section className="footer-container">

        </section>
    )
}

export function LoginAndSignupFooter({ 
    links
}) {
    return (
        <div className = { styles.loginAndSignupContainer }>
            <div className = { styles.loginAndSignupCopy }>
                &copy; { new Date().getFullYear() } @jeff.codes
            </div>
            <div className = { styles.loginAndSignupLinksContainer }>
                <ul>
                {links.map((link, i) => 
                    <LoginAndSignupFooterLink { ...link } key = { i }/>
                )}
                </ul>
            </div>
        </div>
    )
}

function LoginAndSignupFooterLink({ name, href, ...props }) {
    return (
        <li>
            <Link to = { href }>
                { name }
            </Link>
        </li>
    )
}