
import React, { useState, useEffect, useRef } from 'react';
import { RiNotification3Line } from 'react-icons/ri';
import socket from '../Socket/socket';
import {  getUserNotifications } from '../../Utils/http.services';
import profileAvatar from '../../Images/avatar4.png';
import bell from '../../Images/bell3.png';
import styles from './Notifications.module.css';
import './notifications.css';


export default function Notifications(props) {
    const [notifications, setNotifications] = useState([]);
    const [showNotifications, setShowNotifications] = useState(false);
    const notificationContainer = useRef();
    let timer = null;

    useEffect(()=> {
        let mounted = true;
        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

        if (user && mounted ) {
            getNotifications(user, setNotifications);
        }
        socket.on('userDataChange', function() {
            if (mounted) {
                getNotifications(user, setNotifications);
            } 
        });
        socket.on('seenNotificationsSuccess', function() {
            if (mounted) {
                getNotifications(user, setNotifications);
            } 
        });
        
        return () => {
            mounted = false;
        }  
    }, []);

    useEffect(()=> {  
        return () => {
            if (timer) clearTimeout(timer);
        }  
    }, [timer]);

    const getNotifications = async (user, setNotifications) => {
        try {
            const { data } = await getUserNotifications(user)
            setNotifications(data);
        } catch(err) {

        }  
    }

    const toggleNotifications = () => {
        setShowNotifications(prevState => !prevState)
    }

    const onBlurHandler = () => { 
        alert(true)   
        timer = setTimeout(() => setShowNotifications(false));  
    }
    // If a child receives focus, do not close the popover.  
    const onFocusHandler = () => {   
        clearTimeout(timer);  
    }

    const onClickOutsideHandler = (e) => { 
        const { current } = notificationContainer;   
        if (showNotifications && current && !current.contains(e.target)) {      
            setShowNotifications(false);    
        }  
    }

    return (
        <>
            <div className="notifications-container">
                <NotificationIcon
                openNotifications= { toggleNotifications }
                notifications={ notifications }
                notificationOpen={showNotifications}
                />
            </div>
            <div className="notifications-dropdown-container-wrapper">
            {
                showNotifications && (
                    <NotificationsDropDown
                    notifications ={ notifications }
                    onBlur = { onBlurHandler }
                    onFocus = { onFocusHandler }
                    onClickOutside = { onClickOutsideHandler }
                    ref = { notificationContainer }
                    show = { showNotifications }
                    /> 
                )
            }
            </div>
        </>
    )
}

const  NotificationsDropDown = React.forwardRef(({ 
    notifications, 
    onClickOutside,
    onBlur,
    onFocus, 
    show,
    ...props 
}, ref) => {   
    useEffect(()=> {
        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

        checkIfNotificationsIsSeen(notifications)
        .then(notSeen => {
            if (notSeen) {
               return  socket.emit('seenNotifications', user);
            }  
        })
    }, [notifications]);

    useEffect(()=> {
        window.addEventListener('click', onClickOutside);
        return () => window.removeEventListener('click', onClickOutside);
    }, [onClickOutside]);


    const checkIfNotificationsIsSeen = async (notifications) => {
        let notSeen = false;
        for (let i = 0; i < notifications.length; i++) {
            if (notifications[i].seen === false) {
               notSeen = true;
               break;
            }
        }
        return notSeen;
    }

    const dropdownContainer = show ? (
        "notifications-dropdown-container"
    ) : (
        "notifications-dropdown-container"
    )

    return (
        <div 
        className= { dropdownContainer }
        onBlur={ onBlur }           
        onFocus={ onFocus }
        ref={ ref }
        > 
            <div className="notifications-dropdown-header">
                Notifications
            </div> 
            <div className="notifications-dropdown-wrapper">
            {
                notifications.length > 0 ? notifications.map((notification, i) =>   
                    <NotificationsBox key = { i }  { ...notification } />
                ) : (
                   <EmptyNotifications/>
                ) 
            }
            </div> 
        </div> 
    )
})

function EmptyNotifications(props) {
    return (
        <div className={ styles.emptyContainer }>
            <div className={ styles.emptyWrapper }>
                <div className={ styles.emptyImage }>
                    <img src ={ bell } alt ="" />
                </div>
                <div className={ styles.emptyHeader }>
                    No Notifications
                </div>
                <div className={ styles.emptyBody }>
                    You currently do not have any notification at the moment. 
                </div>
            </div>
            
        </div> 
    )
}

function NotificationIcon({ 
    openNotifications, 
    notifications,
    notificationOpen,
     ...props 
}) {
    const notSeenNotificationsCount = (notifications) => {
        let j = 0;
        let i = 0;
        let len = notifications.length;
        for (i; i < len; i++) {
            if (notifications[i].seen === false) {
                j += 1
            }
        }
        return j;
    }

    return (
        <div 
        className={`notifications-icon-wrapper ${notificationOpen ? "notifications-open" : ""}`} 
        onClick = { openNotifications }
        >
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
    // TODO... implement view profile functionality
    const viewProfile =() => {

    }

    return (
        <div className="notification-container">
            <div className="notification-header">
                <div className="notification-image">
                    <img src={  userProfileImage || profileAvatar } alt="profile" /> 
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