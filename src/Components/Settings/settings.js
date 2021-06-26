



import React, {useEffect, useState} from 'react';
import useAuth from '../../Context/context';
import './settings.css';



export default function Settings(props) {
    // const [user, setUser] = useState({});
    const [isNewUser, setisNewUser] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
            const isNewUser = user ?  user?.newUser : null;
            setisNewUser(isNewUser);
    }, [user]);

   

    const removeWelcome = (user) => {

    }

    return (
        <div>
            this is the settings component
        {
            (isNewUser) && (
                <div onClick={()=>removeWelcome(user)}>
                    <div>
                        <p>{`welcome ${user.userEmail} `}</p>
                    </div>
                </div>

            )
        }
        </div>
    )
}