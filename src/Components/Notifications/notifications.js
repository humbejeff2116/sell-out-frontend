




import React, {useState, useEffect} from 'react';
import './notifications.css';
import socket from '../Socket/socket';

export default function Notifications(props) {
    const [initialNotificationLength, setInitialNotificationsLength] = useState();
    const [notifications, setNotifications] = useState([]);
    const [ showNotifications, setShowNotifications ] = useState(false);
    // TODO... uncomment useEffect when finished with the backend code
    // useEffect(()=> {
    //     //TODO... get the user from context and pass to getNotifictions function
    //     getInitialNotifications();
    //     socket.on('notificationsDataChange', function() {
    //         getNotifications();
    //     })
    // })
    const getInitialNotifications = (user) => {
        socket.emit('getNotificationsInitialData', user);
        socket.on('notificationsInitialData', function (response) {
            const {data} = response;
            setNotifications(data);
            setInitialNotificationsLength(data.length);
            
        });
    }
    const getNotifications = (user) => {
        socket.emit('getNotificationsInitialData', user);
        socket.on('notificationsInitialData', function (response) {
            const {data} = response;
            setNotifications(data);
        });
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
                notifications.map((notification,i) =>
                    <NotificationsBox key={i} {...notification} />
                )     
            )
        }
        </>
    )
}
function NotificationsBox(props) {
    const { notification } = props;
    const {userName, userId, userProfileImage, notificationMessage} = notification;

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