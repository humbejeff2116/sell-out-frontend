
import React, { useEffect, useState } from 'react';
import { Redirect, useLocation, useHistory } from 'react-router-dom';
import { useGetStartedContext } from '../../../Context/context';
import { ImWarning } from 'react-icons/im';
//avatar SVG image gotten from https://svgrepo.com
import image from '../../../Images/avatar2.png';
import { FiCamera } from 'react-icons/fi';
// import { BsExclamationCircle } from 'react-icons/bs';
import './profileImage.css';
import '../Contact/contact.css';

export default function ProfileImage(props) {

    const [redirect, setRedirect] = useState('');

    // const [imageFile, setImageFile] = useState(null);

    const [displayImageURL, setDisplayImageURL] = useState(null);

    const [profileError, setProfileError] = useState('');

    const [showImageSelector, setShowImageSelector] = useState(false);

    const location = useLocation();

    const history = useHistory();

    const { 
        profileImageFile,
        profileImageURL, 
        setProfileImageFile,
        setProfileImageURL,
        setIsLocationDataSet, 
        setIsProfileDataSet, 
    } = useGetStartedContext();

    useEffect(() => {  

        window.scrollTo(0, 0);

    }, []);

    const goBack = ( ) => {

        setIsLocationDataSet(false)

        setIsProfileDataSet(false)

        setProfileImageURL(displayImageURL); 

        history.push(location.pathname);

        setRedirect('/getting-started/application/shipping-and-operations');

    }

    const handleSubmit = (profileImageFile) => {

        if (!profileImageFile) {

            return setProfileError('Profle picture required')

        }

        history.push(location.pathname);

        setRedirect('/getting-started/application/confirmation');

    }

    const handleImageChange = (e) => {

        setProfileImageFile({

            [e.target.name] : e.target.files[0] 

        })

        setDisplayImageURL(URL.createObjectURL(e.target.files[0]))

        setProfileImageURL(URL.createObjectURL(e.target.files[0]));

        setProfileError('')

    }
    
    if (redirect) {

        return (

            <Redirect to={redirect} />

        )

    }

    const imageError = ( <> <ImWarning/> { profileError } </> )

    const gettingStartedInputClassName = showImageSelector ? "getting-started-input visible" : "getting-started-input"

    const showImageIcon = (e) => {

        setShowImageSelector(true)

    }

    const hideImageIcon = (e) => {

        setShowImageSelector(false)

    }
    
    return (

        <div className="getting-started-contact-container">
            {
                profileError && (

                    <div className="getting-started-error">
                    <span>{ profileError ? imageError : ''}</span>
                    </div>

                )
            }
            
        <div className="getting-started-contact-panel">
            {/* avatar */}   
            <div className="getting-started-contact-avatar">
                <div className="getting-started-contact-heading">
                    <p>
                        Kindly upload a profile image 
                    </p>
                </div>
                <div className="getting-started-profile-image">
                   
                    <div 
                    className={ gettingStartedInputClassName }
                    onMouseEnter ={showImageIcon}
                    onMouseLeave = {hideImageIcon}   
                    >

                        <ProfileImageSelector
                        // label="Select Product Images"
                        labelClassName={ "getting-started-input-label" }
                        labelSpanClassName="title"
                        name="productImages"
                        type="file"
                        // TODO... replace icon with a proper image icon 
                        icon= { <FiCamera/> }
                        onChange = { handleImageChange }                
                        />
                           
                    </div>

                    <img 
                    src={
                        displayImageURL ? displayImageURL : 
                        profileImageURL ? profileImageURL : image 
                    } 
                    alt=""
                    onMouseEnter ={showImageIcon}
                    onMouseLeave = {hideImageIcon}
                    />

                    {/* <div className="getting-started-error">
                        <span>{ profileError ? imageError : ''}</span>
                    </div> */}

                </div>  
            </div>
            {/* body */}
            <div className="getting-started-contact-body">
            <div className="getting-started-profile-image-info">
                <span className="brand-name">
                    This image is usually tagged on all your products you put up for sale, 
                    to enable buyers identify products which are being sold by you.
                </span>
                </div>
                {/* buttons */}
                <div className="getting-started-contact-buttons">
                    <div className="getting-started-contact-back-button">
                        <button onClick={()=>goBack()} >
                            Back
                        </button>
                    </div>
                    <div className= { `getting-started-contact-next-button` } >
                    <button 
                    onClick={ ()=> handleSubmit(profileImageFile) }
                    // disabled = { disableButton }
                    >
                    Continue
                    </button>
                    </div>
                </div>
            </div>  
        </div>
        </div>

    )

}


const ProfileImageSelector = ({labelClassName, labelSpanClassName, label, ...props}) => {

    return (

        <label className={ labelClassName }  >

            <i>{props.icon}</i>

            <input className={ props.inputClassName || "product-images" } {...props} />

        </label>
    )

} 