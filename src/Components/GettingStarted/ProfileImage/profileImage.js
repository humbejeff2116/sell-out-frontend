




import React, { useEffect, useState } from 'react';
import { Redirect, useLocation, useHistory } from 'react-router-dom';
import { useGetStartedContext } from '../../../Context/context';
import { ImWarning } from 'react-icons/im';
import useAuth from '../../../Context/context';
import './profileImage.css';
import '../Contact/contact.css';




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
        <div className="getting-started-contact-container">
        <div className="getting-started-contact-panel">
            {/* avatar */}   
            <div className="getting-started-contact-avatar">
                <div className="getting-started-contact-heading">
                    <p>
                        Kindly upload a profile image 
                    </p>
                </div>
                <div className="getting-started-profile-image">
                    <img 
                    src={
                        displayImage ? displayImage : 
                        profileImage ? profileImage : ""
                    } 
                    alt="profile avatar"
                    />
                    <div className="getting-started-input">
                        {/* <div className="getting-started-input-icon">
                            <span>icon<span>Edit</span></span>
                        </div> */}
                        <input type="file"  name="profileImage" onChange={ handleImageChange }  />
                    </div>
                    <div className="getting-started-error">
                        <span>{ profileError ? imageError : ''}</span>
                    </div>
                </div>  
            </div>
            {/* body */}
            <div className="getting-started-contact-body">
                <div className="getting-started-profile-image-info">
                {
                    <>
                    <div><span className="getting-started-info-group">FULL NAME: </span><span>{user?.fullName} john adakole</span></div>
                    <div><span className="getting-started-info-group">CONTACT EMAIL: </span><span>{formDetails?.contactEmail} john@gmail.com</span></div>
                    <div><span className="getting-started-info-group">CONTACT NUMBER: </span><span>{formDetails?.contactNumber} 0805557758557</span></div>
                    <div><span className="getting-started-info-group">COUNTRY: </span><span>{formDetails?.country} Nigeria</span></div>
                    <div><span className="getting-started-info-group">CITY: </span><span>{formDetails?.city} Makurdi</span></div>
                    <div><span className="getting-started-info-group">CONTACT ADDRESS: </span><span>{formDetails?.address} Behind child evangelical ministries off goerge akume way makurdi benue state</span></div>
                    </>
                }
                <span className="brand-name">
                    All data entered in this proccess by you can be modified, or deleted at anytime, 
                    and by submitting these information you are giving us consent to share this data
                    wherever your profile appears. Kindly go through our privacy policy if you haven't 
                    to know how we use your information or how you can manage your data. 
                </span>
                </div>
                {/* buttons */}
                <div className="getting-started-contact-buttons">
                    <div className="getting-started-contact-back-button">
                        <button onClick={()=>goBack()} >
                            Back
                        </button>
                    </div>
                    <div className="getting-started-contact-next-button">
                    <button onClick={ ()=> handleSubmit(imageFile, user, profileImageError, userUpdatedSuccessful)}>Submit details</button>
                    </div>
                </div>
            </div>  
        </div>
        </div>
    )
}