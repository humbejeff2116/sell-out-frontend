




import React, {useState, useEffect} from 'react';
import './notifications.css';
import socket from '../Socket/socket';
import {  getUserNotifications } from '../../Utils/http.services';
import useAuth from '../../Context/context';
import image from '../../Images/avatar.jpg';

export default function Notifications(props) {
    // const [initialNotificationLength, setInitialNotificationsLength] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [ showNotifications, setShowNotifications ] = useState(false);
    useEffect(()=> {
        let mounted = true;
        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
        const getNotifications = async (user, mounted) => {
            try {
                const notificationResponse = await getUserNotifications(user)
                const {data} = notificationResponse;
                if (mounted) {
                    console.log(data)
                    setNotifications(data);
                }
            }catch(err) {

            }  
        }

        if (user && mounted ) {
            getNotifications(user, mounted);
        }

        socket.on('userDataChange', function() {
            if (mounted) {
                getNotifications(user, mounted);
            }   
        });
        socket.on('seenNotificationsSuccess', function() {
            if (mounted) {
                getNotifications(user, mounted);
            }   
        });
        
        return () => {
            mounted = false;
        }    
    }, []);

    const toggleNotifications = () => {
        setShowNotifications(prevState => !prevState)
    }
    return (
        <>
        <div className="notifications-container">
            <NotificationIcon
            openNotifications= {toggleNotifications}
            notifications={notifications}
            />
        </div>
        {
            showNotifications && (
                <NotificationsDropDown
                notifications ={notifications}
                /> 
            )
        }
        </>
    )
}
function NotificationsDropDown(props) {
    useEffect(()=> {
        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
        checkIfNotificationsIsSeen(props.notifications)
        .then(notSeen => {
            if(notSeen) {
               return  socket.emit('seenNotifications', user);
            }
        })
    }, []);
    const checkIfNotificationsIsSeen = async (notifications) => {
         let notSeen = false;
        for (let i = 0; i < notifications.length; i++) {
            if(notifications[i].seen === false) {
               notSeen = true;
               break;
            }
        }
        return notSeen
    }
    return (
        <div className="notifications-dropdown-wrapper">
        <div className="notifications-dropdown-container">
            {
                props.notifications.length ? props.notifications.map((notification, i) =>
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


function NotificationIcon(props) {
    const setNotifications = (notifications) => {
        let j = 0;
        for (let i = 0; i < notifications.length; i++) {
            if(notifications[i].seen === false) {
                j++
            }
        }
        return j;   
    }
    return (
        <div className="notifications-icon" onClick={props.openNotifications}>
            <i>icon</i>
            <span>
                {
                    props.notifications && (
                        setNotifications(props.notifications) > 0  ?
                        setNotifications(props.notifications) : ''
                    ) 
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