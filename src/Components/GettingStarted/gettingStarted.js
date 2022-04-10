
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../Context/context';
import './gettingStarted.css';


export default function GettingStarted() {

    const { user } = useAuth();

    useEffect(() => { 

        window.scrollTo(0,0);

    }, []);


    const removeGettingStartedPageAccess = () => {

        if (sessionStorage.getItem('access-getting-started-page') ) sessionStorage.removeItem('access-getting-started-page') 

    }

    return (

        <div className="welcome-container-wrapper">
          
            <div className="welcome-container">
                <div className="welcome-header">
                    <h2>Wish to sell your products on Fling ? Kindly set up a profile</h2>
                </div>

                <div className="welcome-body">
                    <div className="welcome-body-message-container">
                        <div className="welcome-body-message">
                        
                        <p>Hi, <span >{`${user?.fullName || ""} `}</span></p>
                        <p> 
                            Thank you for showing interest in using Fling.
                            This platform enables you to buy or sell all sorts and categories of produts. To be able to use this platform
                            to sell your products, or advertise your services, you will need to:
                        </p>
                        <ul>
                            <li>Fill out a profile which identifies your company, business or brand</li>
                            <li>Submit your profile, upload your products catalogue and start selling using this platform</li>      
                        </ul>
                        </div>
                        
                    <div className="welcome-body-bottom">
                        <div className="welcome-body-index-link">
                            <p>You only wish to buy products for now ?</p>
                            <div className="welcome-body-index-link-bttn">
                                <button onClick={ removeGettingStartedPageAccess }><Link to="/home">Click me</Link></button>
                            </div>
                        </div>
                        <div className="welcome-body-bttn"><button><Link to="/getting-started/application/company-or-business">Set up profile</Link></button></div>
                    </div>
                    </div>
                </div>    
            </div>

        </div>

    )

}