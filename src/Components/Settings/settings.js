



import React, {useEffect, useState} from 'react';
import useAuth from '../../Context/context';
import './settings.css';



export default function Settings(props) {
    const [user, setUser] = useState({});
    const [isNewUser, setisNewUser] = useState(false);
    const { userData } = useAuth();

    useEffect(() => {
        getState();

    },[]);

    function getState() {
        const userData =  localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
        const isNewUser = userData ?  userData.newUser : null;
        if(userData && isNewUser) {
            setUser(userData);
            setisNewUser(isNewUser);
            return true;
        }
        return false; 
    }

    function removeWelcome(user) {

    }

    return (
        <div>
            this is the settings component
        {
            (isNewUser) && (
                <div onClick={()=>removeWelcome(user)}>
                    <div>
                        <p>{`welcome ${user.fullName} `}</p>
                    </div>
                </div>

            )
        }
        </div>
    )
}