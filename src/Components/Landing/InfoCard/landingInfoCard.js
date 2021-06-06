


import React, {useState} from 'react';
import { Link, Redirect } from 'react-router-dom';

export default function LandingInfoCard() {
    const [redirect, setRedirect] = useState('');

    if(redirect) {
        return (
            <Redirect to={redirect} />
        )
    }
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