



import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../Context/context';
import './settings.css';



export default function Settings(props) {
    // const [user, setUser] = useState({});
    const [isNewUser, setisNewUser] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
            const isNewUser = user ?  user?.newUser : null;
            // setisNewUser(isNewUser);
    }, [user]);

   

    const removeWelcome = (user) => {

    }

    return (
        <div className="settings-panel">
            <div className="settings-panel" > 
            setting page  
            </div> 
        </div>
    )
}