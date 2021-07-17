




import React, {useEffect, useState} from 'react';
import { Redirect, useLocation, useHistory } from 'react-router-dom';
import { useGetStartedContext } from '../../../Context/context';
import useAuth from '../../../Context/context';
import './profileImage.css';




export default function ProfileImage(props) {
    const [redirect, setRedirect] = useState('');
    const [profile, setProfileImage] = useState(null);
    const [profileError, setProfileError] = useState('')
    const location = useLocation();
    const history = useHistory();
    const {setUserData, setTokenData} = useAuth();
    const {profileImage, setProfile, setIsLocationDataSet, setIsProfileDataSet, handleSubmit} = useGetStartedContext();
    useEffect(() => {  
        window.scrollTo(0, 0);
    }, []);
    const goBack = ( ) => {
        setIsLocationDataSet(false)
        setIsProfileDataSet(false)
        setProfile(profile); 
        history.push(location.pathname);
        setRedirect('/getting-started/location');   
    }
    const handleImageChange = (e) => {
        setProfileImage({
            [e.target.name] : e.currentTarget.files[0] 
        });
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

    return (
        <div className="getting-started-profile-image-container">
            {/* profile avatar */}
           <div className="getting-started-profile-image">
               <div>
                   <img src="" alt="profile avatar"/>
               </div>
               <div>
               <input type="file"  name="profileImage" onChange={ handleImageChange } placeholder="images*" />
               </div>
               <div>
                {profileError || ''}
               </div>

           </div>
           {/* profile details */}
           <div className="getting-started-profile-image-info-contr">
               <div className="getting-started-profile-image-info">
                 <span>full name</span>
                 <span>email</span>
                 <span>contact number</span>
                 <span>country</span>
                 <span>city</span>
                 <span>address</span>
               </div>

           </div>
          
           <div className="getting-started-profile-image-buttons">
               <div className="getting-started-profile-image-back-button">
                   <button onClick={()=> goBack()}>Go Back</button>
               </div>
               <div className="getting-started-profile-image-upload-button">
                   <button onClick={ ()=> handleSubmit(profile, profileImageError, userUpdatedSuccessful)}>Upload Profile</button>
               </div>

           </div>
        </div>
    )

}


