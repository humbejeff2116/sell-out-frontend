
import React, { useState, useEffect } from 'react';
import socket from '../Socket/socket';
import {  getUserNotifications } from '../../Utils/http.services';
import { RiNotification3Line } from 'react-icons/ri';
import image from '../../Images/avatar.jpg';
import './notifications.css';


export default function Notifications(props) {

    const [notifications, setNotifications] = useState([]);

    const [showNotifications, setShowNotifications] = useState(false);

    useEffect(()=> {

        let mounted = true;

        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
        
        const getNotifications = async (user, mounted) => {

            try {

                const { data } = await getUserNotifications(user)

                if (mounted) {

                    setNotifications(data);

                }
                // TODO... handle error
            } catch(err) {

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

function NotificationsDropDown({ notifications, ...props }) {

    useEffect(()=> {

        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
        
        checkIfNotificationsIsSeen(notifications)
        .then(notSeen => {

            if (notSeen) {

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

        return notSeen;

    }

    return (

        <div className="notifications-dropdown-wrapper">
           
        <div className="notifications-dropdown-container">
            {
                notifications.length > 0 ? notifications.map((notification, i) =>
                    
                    <NotificationsBox key = { i }  { ...notification } />
                
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

function NotificationIcon({ openNotifications, notifications, ...props }) {

    const notSeenNotificationsCount = (notifications) => {

        let j = 0;

        for (let i = 0; i < notifications.length; i++) {

            if (notifications[i].seen === false) {

                j++
            }

        }

        return j;

    }

    return (

        <div className="notifications-icon-wrapper" onClick = { openNotifications }>
            <RiNotification3Line className="notification-icon" />
            {
                notifications && (

                    notSeenNotificationsCount(notifications) > 0  ?
                    ( <NotificationAlert className="notifications-icon-alert"/> ) : ''

                ) 
            }
        </div>

    )

}

export function NotificationAlert({ className, ...props }) {

    return(

        <div className={ className }>

        </div>

    )

}

function NotificationsBox({ userName, userId, userProfileImage, action, ...props }) {

    // TODO... implement vie profile functionality
    const viewProfile =() => {

    }

    return (

        <div className="notification-container">

        <div className="notification-header">
            <div className="notification-image">
                <img src={  userProfileImage || image } alt="profile" /> 
            </div>

            <div className="notification-name">
                <span onClick = { ()=> viewProfile(userId) }>{ userName }</span>
                <div className="notification-time">  
                <span>2 weeks ago</span>
            </div>
            </div>

            <div className="notification-remove">  
                x
            </div>
        </div>

        <div className="notification-details">
            <span> { action } </span>
        </div>
            
        </div>

    )
}