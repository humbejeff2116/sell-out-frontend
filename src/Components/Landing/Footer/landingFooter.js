


import React from 'react';
import './landingFooter.css';

export default function LandingFooter(){
    return (
        <footer>
            <div className="landing-footer-top">
                <section>content1</section>
                <section>content2</section>
                <section>content3</section>
                <section>content4</section>
            </div>

            <div className="landing-footer-bottom">
                {/* social */}
                <section>social navigation</section>
                {/* copyright */}
                <section>copyright</section>
            </div>
        </footer>
    )
}