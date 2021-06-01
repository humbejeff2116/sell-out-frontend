




import React from 'react';
import Header from './Header/header';
import LandingInfoCard from './InfoCard/landingInfoCard';
import LandingFooter from './Footer/landingFooter';
import './landing.css';




export default function LandingComponent(props) {
    return (
        <section className="landing-container">
            {/* 100vh */}
            <div className="landing-top" >
                <Header/>
                <LandingInfoCard/>
            </div>
            {/* flex row contains three divs 100vh */}
            <div className="landing-center" >
                <div className="landing-center-1">1</div>
                <div className="landing-center-2">2</div>
                <div className="landing-center-3">3</div>
            </div>

            <div className="landing-footer" >
                <LandingFooter/>
            </div>

        </section>
    )
}