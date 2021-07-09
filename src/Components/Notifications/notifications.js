




import React, {useState, useEffect} from 'react';
import './notifications.css';
import socket from '../Socket/socket';
import useAuth from '../../Context/context';

export default function Notifications(props) {
    const [initialNotificationLength, setInitialNotificationsLength] = useState(0);
    const [notifications, setNotifications] = useState([]);
    const [ showNotifications, setShowNotifications ] = useState(false);
    const {user} = useAuth();


    useEffect(()=> {
        socket.on('connect', function() {
            getNotifications(user);
            socket.on('getNotificationsSuccess', function (response) {
                const { data } = response;
                let setNotificationsLength;
                setNotifications(data);
                setNotificationsLength = initialNotificationLength ?? setInitialNotificationsLength(data.length); 
                return setNotificationsLength;   
            });
            socket.on('productDataChange', function() {
                getNotifications(user);
            });
        });
          
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
                notifications.map((notification, i) =>
                    <NotificationsBox key={i} {...notification} />
                )     
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
        <div>
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

