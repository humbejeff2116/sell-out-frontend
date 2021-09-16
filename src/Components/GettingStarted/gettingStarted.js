
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
        <div className="welcome-container-wrapper">
          
        {
            (isNewUser) && (
                <div className="welcome-container" onClick={()=>removeWelcome(user)}>
                    <div className="welcome-header">
                        <h2>Wish to sell your products on Sellout ? Kindly set up a profile</h2>
                    </div>

                    <div className="welcome-body">
                        <div className="welcome-body-message-container">
                            <div className="welcome-body-message">
                           
                            <p>Hi, <span >{`${user?.fullName || ""} `}</span></p>
                            <p> 
                                Thank you for showing interest in using sellout.
                                This platform enables you to buy or sell all sorts of produts wether new or used. To be able to use this platform
                                to sell products, or advertise your services, you will need to:
                            </p>
                            <ul>
                                <li>Fill out a profile which buyers would identify you or your brand with</li>
                                <li>Submit your profile and you can start selling</li>      
                            </ul>
                            </div>
                            
                        <div className="welcome-body-bottom">
                            <div className="welcome-body-index-link">
                                <p>You only wish to buy products for now ?</p>
                               <div className="welcome-body-index-link-bttn">
                                   <button><Link to="/home">Click me</Link></button>
                                </div>
                            </div>
                            <div className="welcome-body-bttn"><button><Link to="/getting-started/contact">Set up profile</Link></button></div>
                        </div>
                        </div>

                   
                    </div>

                   
                </div>

            )
        }
        </div>
    )
}