




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
        socket.on('connect', function() {
            getInitialNotifications(user);
            socket.on('notificationsInitialData', function (response) {
                const {data} = response;
                setNotifications(data);
                setInitialNotificationsLength(data.length);  
            });
            socket.on('notificationsDataChange', function() {
                getNotifications(user);
            });
            socket.on('notificationsInitialData', function (response) {
                const { data } = response;
                setNotifications(data);
            });
        });
          
    }, [user]);
    const getInitialNotifications = (user) => {
        socket.emit('getNotificationsInitialData', user);   
    }
    const getNotifications = (user) => {
        socket.emit('getNotificationsInitialData', user);
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
    const {userName, userId, userProfileImage, notificationMessage} = props;

    const viewProfile =() => {

    }
    return (
        <div>
        <div>
            <img src={userProfileImage} alt="profile" />
             <span onClick={()=>viewProfile(userId)}>{userName}</span>
        </div>
        <div>
            <p> {notificationMessage} </p>
        </div>
    </div>
    )
}

