
import React from 'react';
import useAuth from '../../Context/context';
import profileAvatar from '../../Images/avatar4.png';
import './profileAvatar.css';




export default function ProfileAvatar(props) {

    const { user } = useAuth();

    return (

        <div className="profile-avatar-container">
           < Avatar
           userName ={ user?.fullName }
           userAvatarSrc={user?.profileImage}
           />
        </div>

    )

}


function Avatar({ userAvatarSrc, userName, ...props }) {

    const formatName = (name) => {

        const [first, second]= name.split(' ');

        if (first && second) {

            if (second.length > 6) {

                return `${ first } ${ second.slice(0, 1).toUpperCase() }.`

            }

            return `${ first } ${ second }`

        }

        return `${ first }`
        
    }

    const imageSrc = (userAvatarSrc === "no-image" || !userAvatarSrc ) ? null : userAvatarSrc 

    return (

        <>
            <div className="profile-avatar-image">
            <img src={ imageSrc || profileAvatar } alt="profile avatar" />
            </div>
            <div className="profile-avatar-username">
                <span>{ userName ? formatName(userName) : "" }</span>
            </div>
            {/* <div className="profile-avatar-username location">
                <span>Cross River, Nigeria</span>
            </div> */}
        </>

    ) 
     
}