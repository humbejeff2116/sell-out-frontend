




import React, { useEffect, useState } from 'react';
import { Redirect, useLocation, useHistory } from 'react-router-dom';
import { useGetStartedContext } from '../../../Context/context';
import { ImWarning } from 'react-icons/im';
import useAuth from '../../../Context/context';
import './profileImage.css';




export default function ProfileImage(props) {
    const [redirect, setRedirect] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [displayImage, setDisplayImage] = useState(null);
    const [profileError, setProfileError] = useState('');
    const location = useLocation();
    const history = useHistory();
    const {user, setUserData, setTokenData} = useAuth();
    const {profileImage, setProfile, setIsLocationDataSet, setIsProfileDataSet, handleSubmit, getDetails} = useGetStartedContext();
    useEffect(() => {  
        window.scrollTo(0, 0);
    }, []);
    const goBack = ( ) => {
        setIsLocationDataSet(false)
        setIsProfileDataSet(false)
        setProfile(displayImage); 
        history.push(location.pathname);
        setRedirect('/getting-started/location');   
    }
    const handleImageChange = (e) => {
        setImageFile({
            [e.target.name] : e.currentTarget.files[0] 
        });
        setDisplayImage(URL.createObjectURL(e.currentTarget.files[0]))
        setProfile(URL.createObjectURL(e.currentTarget.files[0]));
        setProfileError('')
    }
    const profileImageError = (errorMssg) => {
        window.scrollTo(0, 0)
        setProfileError(errorMssg)
    }
    const userUpdatedSuccessful = (response) => {
        const { data, token } = response;
        history.push(location.pathname);
        setUserData(data)
        setTokenData(token);
        setRedirect('/home');
    }
    
    if(redirect) {
        return (
            <Redirect to={redirect} />
        )
    }
    const imageError = (<><ImWarning/>{profileError}</>);
    const formDetails = getDetails();

    return (
        <div className="getting-started-profile-image-container">
            {/* profile avatar */}
           <div className="getting-started-profile-image">
               <div className="getting-started-image">
                   <img 
                    src={
                       displayImage ? displayImage : 
                       profileImage ? profileImage : ""
                    } 
                    alt="profile avatar"
                   />
               </div>
               <div className="getting-started-input">
               <input type="file"  name="profileImage" onChange={ handleImageChange }  />
               </div>
               <div className="getting-started-error">
                <span>{ profileError ? imageError : ''}</span>
               </div>

           </div>
           {/* profile details */}
           <div className="getting-started-profile-image-info-contr">
               <div className="getting-started-profile-image-info">
                {
                    <>
                    <div><span className="getting-started-info-group">Full Name: </span><span>{user?.fullName}</span></div>
                    <div><span className="getting-started-info-group">Contact Email: </span><span>{formDetails?.contactEmail}</span></div>
                    <div><span className="getting-started-info-group">Contact Number: </span><span>{formDetails?.contactNumber}</span></div>
                    <div><span className="getting-started-info-group">Country: </span><span>{formDetails?.country}</span></div>
                    <div><span className="getting-started-info-group">City: </span><span>{formDetails?.city}</span></div>
                    <div><span className="getting-started-info-group">Address: </span><span>{formDetails?.address}</span></div>
                    </>
                
                }
               </div>

           </div>
          
           <div className="getting-started-profile-image-buttons">
               <div className="getting-started-profile-image-back-button">
                   <button onClick={()=> goBack()}>Go Back</button>
               </div>
               <div className="getting-started-profile-image-upload-button">
                   <button onClick={ ()=> handleSubmit(imageFile, user, profileImageError, userUpdatedSuccessful)}>Upload Profile</button>
               </div>

           </div>
        </div>
    )

}