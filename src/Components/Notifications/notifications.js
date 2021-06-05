




import React from 'react';
import './notifications.css';


export default function Notifications(props) {
    return (
        <div className="notifications-container">
            <Notification/>
        </div>
    )
}

function Notification(props) {
    return (
        <div className="notifications">
            <i>icon</i><span>100</span>
        </div>
    )
}