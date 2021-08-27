




import React, {useState, useEffect} from 'react';
import './notifications.css';
import socket from '../Socket/socket';
import {  getUserNotifications, getCons } from '../../Utils/http.services';
import useAuth from '../../Context/context';
import image from '../../Images/avatar.jpg';

export default function Notifications(props) {
    const [initialNotificationLength, setInitialNotificationsLength] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [ showNotifications, setShowNotifications ] = useState(false);

    useEffect(()=> {
        const getNotifications = (user, mounted) => {
            getUserNotifications(user)
            .then(notificationsData => {
                const {data} = notificationsData;
                if (mounted) {
                    setNotifications(data);
                }   
            })
            .catch(err => console.error(err))
        }

        let mounted = true;
        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
        if (user && mounted ) {
          
            getNotifications(user, mounted);
        }

        socket.on('productDataChange', function() {
            if (mounted) {
                getNotifications(user, mounted);
            }   
        });
        
        return () => {
            mounted = false;
        }    
    }, []);

    useEffect(()=> {
        let mounted = true;
        
        function setIntialLength(mounted, notifications, initialNotificationLength, setInitialNotificationsLength) {
            if (mounted) {
                if (initialNotificationLength) {
                    return
                }
                setInitialNotificationsLength(notifications.length);       
            } 
        }
        setIntialLength(mounted, notifications, initialNotificationLength, setInitialNotificationsLength)
        
    }, [initialNotificationLength, notifications]);
  
    
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
                <div className="notifications-dropdown-wrapper">
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
                </div>   
            )
        }
        </>
    )
}

function Notification(props) {
    return (
        <div className="notifications-icon" onClick={props.openNotifications}>
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
        <div className="notification">
            <div className="notification-image">
                <img src={image || userProfileImage} alt="profile" /> 
            </div>

            <div className="notification-details">
                <span onClick={()=>viewProfile(userId)}><b>{userName}</b></span>
                <span> {action} </span>
            </div>

            <div className="notification-time">  
                <span>2w</span>
            </div>
        </div>
    )
}

