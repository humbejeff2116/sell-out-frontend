



import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../Context/context';
import './gettingStarted.css';



export default function GettingStarted({match}) {
    // const [user, setUser] = useState({});
    const [isNewUser, setisNewUser] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
            const isNewUser = user ?  user?.newUser : null;
            // setisNewUser(isNewUser);
            window.scrollTo(0,0);
    }, [user]);

   

    const removeWelcome = (user) => {

    }

    return (
        <div>
          
        {
            (isNewUser) && (
                <div className="welcome-container" onClick={()=>removeWelcome(user)}>
                    <div className="welcome-header">
                        <h2>WELCOME ONBOARD</h2>
                    </div>

                    <div className="welcome-body">
                        <div className="welcome-body-message">
                            <p>Trade on sellout</p>
                            <p>{`Hi, ${user?.fullName || "unknown"} `}</p>
                            <p> 
                                Thank you for showing interest in using sellout.
                                This platform enables you to buy or sell all kinds of produts.
                            </p>
                            <p>
                                To be able to trade efficiently on sellout, we need to set up a profile for you.
                            </p>
                        </div>
                        <div className="welcome-body-bottom">
                            <div className="welcome-body-link"><p>only wish to buy products?</p></div>
                            <div className="welcome-body-bttn"><button><Link to="/getting-started/contact">Get started</Link></button></div>
                        </div>
                    </div>
                </div>

            )
        }
        </div>
    )
}