/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { getUser} from '../../Utils/http.services';
import useAuth from '../../Context/context';
import './viewProfile.css';
import image from '../../Images/avatar.jpg';



export default function ViewProfile() {
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(false);
    const {viewUserProfileData} = useAuth();
    // useEffect(()=> {
    //     setLoading(true);
       
    //     getUser(viewUserProfileData)
    //     .then(res => {

    //     })
    //     .catch(err => {

    //     })


    // }, [viewUserProfileData]);
    if (loading) {
        return (
            // TODO... use a loader here
            <div className="view-profile-container">
            
            </div>
        )
    }

    return (
        <div className="view-profile-container">
            {
                // userData.length && userData.map((user, i) =>
                //     <User key={i} {...user} />
                // )
                // (!userData.length) && 
                (
                    // <NoUserMatch />
                    <User />
                )
            }
        </div>
    )
}

function User(props) {
    return (
        <div className="view-profile-panel">
            {/* first flex row */}
            <div className="view-profile">
                <div className="view-profile-message-bttn-wrapper"> 
                    <div className="view-profile-message-bttn">
                        <button>message</button>
                    </div>
                </div>
                <div className="view-profile-image-wrapper">
                    <div className="view-profile-image">
                        <img src={image} alt="avatar" />
                    </div>
                    <div className="view-profile-image-info">
                        <span>Name</span><br />
                        <span>location</span>
                    </div>
                </div>
            </div>
            {/* second */}
            <div className="view-profile-user-info">
                <div className="view-profile-user-info-group">
                <span>Name</span>
                </div>

                <div className="view-profile-user-info-group">
                <span>Name</span>
                </div>

                <div className="view-profile-user-info-group">
                <span>Name</span>
                </div>

                <div className="view-profile-user-info-group">
                <span>Name</span>
                </div>

                <div className="view-profile-user-info-group">
                <span>Name</span>
                </div>

            </div>
        </div>
    )
}

function NoUserMatch(props) {
    return (
        <div>
            <p>
                user details will appear here only when youv'e clicked to view a users profile
            </p>
        </div>
    )
}