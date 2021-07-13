




import React, {useState, useEffect} from 'react';
import './notifications.css';
import socket from '../Socket/socket';
import useAuth from '../../Context/context';

export default function Notifications(props) {
    const [initialNotificationLength, setInitialNotificationsLength] = useState();
    const [notifications, setNotifications] = useState([]);
    const [ showNotifications, setShowNotifications ] = useState(false);
    const {user} = useAuth();


    useEffect(()=> {
        let mounted = true;
            if(user && mounted) {
                getNotifications(user);
            }
            socket.on('getNotificationsSuccess', function (response) {
                const { data } = response;
                let setNotificationsLength;
                if (mounted) {
                    setNotifications(data);
                    setNotificationsLength = initialNotificationLength ?? setInitialNotificationsLength(data.length); 
                    return setNotificationsLength;   
                }  
            });
            socket.on('productDataChange', function() {
                if (mounted) {
                    getNotifications(user);
                }   
            });
            return () => {
                mounted = false;
            }    
    }, [user, initialNotificationLength]);
  
    const getNotifications = (user) => {
        socket.emit('getNotifications', user);
    }
    const toggleNotifications = () => {
        setShowNotifications(prevState => !prevState)
    }
    return (
        <>
        <div className="notifications-container">
            <Notification
            initialNotificationLength={initialNotificationLength}
            openNotifications= {toggleNotifications}
            notifications={notifications}
            />
        </div>
        {
            showNotifications && (
                <div className="notifications-dropdown-container">
                    {
                        notifications.length ? notifications.map((notification, i) =>
                            <NotificationsBox key={i}  {...notification} />
                        ) : (
                            <div>
                            <p>no notifications yet</p>
                            </div>
                        )
                       
                    }
                
                </div>    
            )
        }
        </>
    )
}

function Notification(props) {
    return (
        <div className="notifications" onClick={props.openNotifications}>
            <i>icon</i>
            <span>
                {
                    (props.notifications.length > props.initialNotificationLength ) ?
                    (props.notifications.length - props.initialNotificationLength) : ''
                }
            </span>
        </div>
    )
}

function NotificationsBox(props) {
    const {userName, userId, userProfileImage, action} = props;

    const viewProfile =() => {

    }
    return (
        <div className="notifications-dropdown-container">
            <div>
                <img src={userProfileImage} alt="profile" />
                <span onClick={()=>viewProfile(userId)}>{userName}</span>
            </div>
            <div>
                <p> {action} </p>
            </div>
        </div>
    )
}

