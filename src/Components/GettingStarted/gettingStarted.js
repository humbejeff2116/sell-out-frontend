
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useHistory, Redirect } from 'react-router-dom';
import useAuth, { useGetStartedContext } from '../../Context/context';
import './gettingStarted.css';


export default function GettingStarted() {

    const [redirect, setRedirect] = useState('');

    const { user } = useAuth();

    const { setSubmittedFormPaths } = useGetStartedContext();

    const location = useLocation();

    const history = useHistory();

    useEffect(() => { 

        window.scrollTo(0, 0);

    }, []);


    const removeGettingStartedPageAccess = () => {

        if (sessionStorage.getItem('access-getting-started-page') ) sessionStorage.removeItem('access-getting-started-page') 

    }

    const startProfileSetup = (e) => {

        setSubmittedFormPaths(prevState => [...prevState, { href: location.pathname }]);

        history.push(location.pathname);

        setRedirect('/getting-started/application/company-or-business');

        e.stopPropagation();

    }

    if (redirect) {

        return (

            <Redirect to={redirect} />

        )

    }

    return (

        <div className="welcome-container-wrapper">
          
            <div className="welcome-container">
                <div className="welcome-header">
                    <h2>You wish to be part of Fling? Thats cool!!!</h2>
                </div>

                <div className="welcome-body">
                    <div className="welcome-body-message-container">
                        <div className="welcome-body-message">
                        
                        <p>Hi, <span >{`${user?.fullName || ""} `}</span></p>
                        <p> 
                            Welcome and thank's for showing interest in being part of Fling,
                            a digital community where people come to buy or sell different varieties of products, 
                            connect, hangout and share ideas with like minded people. All you need to do is
                        </p>
                        <ul>
                            <li>Fill out a profile which identifies your company, business or brand</li>
                            <li>Submit your profile, get approved and yeagh you are part of us. Explore and see the benefits the system has to offer you</li>      
                        </ul>

                        </div>
                        
                    <div className="welcome-body-bottom">
                        <div className="welcome-body-index-link">
                            <div className="welcome-body-index-link-bttn" onClick={ removeGettingStartedPageAccess }>
                                <Link to="/home">I only wish to buy products for now </Link>
                            </div>
                        </div>
                        <div className="welcome-body-bttn">
                            <button onClick= { startProfileSetup } >
                                Set up profile
                            </button>
                        </div>
                    </div>
                    </div>
                </div>    
            </div>

        </div>

    )

}