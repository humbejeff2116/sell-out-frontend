


import React from 'react';
import {NavLink} from 'react-router-dom';
import './profileAvatar.css';
import image from '../../Images/avatar.jpg';




export default function ProfileAvatar(props) {
    return (
        <div className="profile-avatar-container">
           < Avatar/>
        </div>
    )
}


function Avatar(props) {
    return (
        <>
            <div className="profile-avatar-image">
            <img src={image} alt="profile avatar" />
            </div>
            <div className="profile-avatar-username">
                <span>Humbe Jeffrey</span>
            </div>
        </>
    )
}