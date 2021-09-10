


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
            <div className="landing-info-card-text-container" >
                <div className="landing-info-card-text-heading">
                <h3>This is the heading</h3>
                </div>
                <div className="landing-info-card-text-paragraph">
                <span>
                Integer pulvinar leo id viverra feugiat. 
                Pellentesque libero ut justo, semper at tempus vel, 
                ultrices in ligula. Lorem ipsum dolor sit amet sed 
                do eiusmod tempor incididunt ut lab
                    
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