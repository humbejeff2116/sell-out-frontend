
import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingInfoCard() {

    return (

        <div className="landing-info-card-contr" >
            {/* info text */}
            <div className="landing-info-card-text-container" >
                <div className="landing-info-card-text-heading">
                <h1>Make selling easy and fun again</h1>
                </div>
                <div className="landing-info-card-text-paragraph">
                <span>
                Join the fastest growing digital community of individuals and independent brands
                whose sole aim is to make money on the go while selling their products.
                </span>
                </div>  
            </div>
            {/* login sign up */}
            <div className="landing-info-card-button">
                {/* login */}
                <div className="landing-info-card-login">
                    <Link to="/login"><button> Login </button></Link>
                </div>
                {/* signup */}
                <div className="landing-info-card-signup">
                <Link to="/signup"><button> Sign up </button></Link>
                </div>

            </div>
        </div>

    )

}