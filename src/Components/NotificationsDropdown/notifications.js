




import React, {useState, useEffect} from 'react';
import './notifications.css';
import socket from '../Socket/socket';
import {  getUserNotifications } from '../../Utils/http.services';
import useAuth from '../../Context/context';
import image from '../../Images/avatar.jpg';
import {MdNotificationsNone} from 'react-icons/md';
import {RiNotification4Line, RiNotification3Line} from 'react-icons/ri'
import {GrNotification} from 'react-icons/gr';
import { BiBell } from "react-icons/bi";

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

// notification icon
function NotificationIcon(props) {
    const notSeenNotificationsCount = (notifications) => {
        let j = 0;
        for (let i = 0; i < notifications.length; i++) {
            if(notifications[i].seen === false) {
                j++
            }
        }
        return j;   
    }
    return (
        <div className="notifications-icon-wrapper" onClick={props.openNotifications}>
            <RiNotification3Line className="notification-icon" />
            {
                props.notifications && (
                    notSeenNotificationsCount(props.notifications) > 0  ?
                    ( <NotificationAlert className="notifications-icon-alert"/> ) : ''
                ) 
            }
        </div>
    )
}
export function NotificationAlert(props) {
    return(
        <div className={props.className}>

        </div>
    )

}

function NotificationsBox(props) {
    const {userName, userId, userProfileImage, action} = props;

    const viewProfile =() => {

    }
    return (
        <div className="notification-container">

        <div className="notification-header">
            <div className="notification-image">
                <img src={image || userProfileImage} alt="profile" /> 
            </div>

            <div className="notification-name">
                <span onClick={()=>viewProfile(userId)}><b>{userName}</b></span>
            </div>

            <div className="notification-time">  
                <span>2w</span>
            </div>
        </div>

        <div className="notification-details">
            <span> {action} </span>
        </div>
            
        </div>
    )
}