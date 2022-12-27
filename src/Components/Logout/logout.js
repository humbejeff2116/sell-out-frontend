import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Loader } from '../Loader/loader';
import  useAuth  from '../../Context/context';
import './logout.css'


export default function Logout() {
    const { logOut } = useAuth();
    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        let timer = null;
        const logOutUser = async ( ) => {
            timer = setTimeout(async () => {
                await logOut();
                history.push(location.pathname);
            }, 2000)
        }
        logOutUser();

        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        }
    }, [history, location.pathname, logOut]);
  
    
    return (
        <div className="logout-container">
            <div className="logout-content">
                <Loader 
                loaderContainer = { "logout-loader-container" }
                loader = { "logout-loader" }
                />
                <div className="logout-content-writeup">
                    <span>Loging out</span>
                </div>
            </div>
        </div>
    )
}