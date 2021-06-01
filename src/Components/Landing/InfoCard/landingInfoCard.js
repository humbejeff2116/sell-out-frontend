


import React from 'react';

export default function LandingInfoCard(){
    return (
        <div className="landing-info-card-contr" >
            {/* info text */}
            <div className="landing-info-card-text" >
                info text
            </div>
            {/* login sign up */}
            <div className="landing-info-card-button">
                {/* login */}
                <div className="landing-info-card-login">
                    <button>login</button>
                </div>
                {/* signup */}
                <div className="landing-info-card-signup">
                    <button>Signup</button>
                </div>

            </div>

        </div>
    )
}