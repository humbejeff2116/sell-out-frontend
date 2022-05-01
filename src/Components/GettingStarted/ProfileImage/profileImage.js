
import React, { useEffect, useState } from 'react';
import { Redirect, useLocation, useHistory } from 'react-router-dom';
import { FiCamera } from 'react-icons/fi';
import { ImWarning } from 'react-icons/im';
import  { GettingStartedPrevAndNextButtons } from '../Template/template';
import { useGetStartedContext } from '../../../Context/context';
//image credit to https://svgrepo.com
import image from '../../../Images/avatar2.png';

export default function ProfileImage(props) {

    const [redirect, setRedirect] = useState('');

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
        setSubmittedFormPaths,
        removePathName
    } = useGetStartedContext();

    useEffect(() => {  

        window.scrollTo(0, 0);

    }, []);

    useEffect(() => { 

        let timer = null; 

        if (profileError) {

            timer = setTimeout(() => setProfileError(''), 4500)

        }

        return () => {
            
            if (timer) {
                
                clearTimeout(timer);

            }
        }

    }, [profileError]);

    const goBack = ( ) => {

        setProfileImageURL(displayImageURL); 

        removePathName('/getting-started/application/shipping-and-operations')

        history.push(location.pathname);

        setRedirect('/getting-started/application/shipping-and-operations');

    }

    const handleSubmit = (profileImageFile) => {

        if (!profileImageFile) {

            return setProfileError('Profile picture is required')

        }

        setSubmittedFormPaths( prevState => [...prevState, { href: location.pathname }]);

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

    const gettingStartedInputClassName = showImageSelector ? 
    "getting-started-application-template-input visible" : "getting-started-application-template-input"

    const showImageIcon = (e) => {

        setShowImageSelector(true)

    }

    const hideImageIcon = (e) => {

        setShowImageSelector(false)

    }
    
    return (

        <div className="getting-started-application-template-container">
        {
            profileError && (

                <div className="getting-started-error">
                <span>{ profileError ? imageError : ''}</span>
                </div>

            )
        }  
        <div className="getting-started-application-template-panel">
            {/* avatar */}   
            <div className="getting-started-application-template-avatar">
                <div className="getting-started-application-template-heading">
                    <p>
                        Kindly upload a profile image 
                    </p>
                </div>
                <div className="getting-started-application-template-profile-img">
                   
                    <div 
                    className = { gettingStartedInputClassName }
                    onMouseEnter = { showImageIcon }
                    onMouseLeave = { hideImageIcon }   
                    >

                        <ProfileImageSelector
                        labelClassName = { "getting-started-input-label" }
                        labelSpanClassName="title"
                        name="profileImage"
                        type="file"
                        icon = { <FiCamera/> }
                        onChange = { handleImageChange }                
                        />
                           
                    </div>

                    <img 
                    src = {
                        displayImageURL ? displayImageURL : 
                        profileImageURL ? profileImageURL : image 
                    } 
                    alt= ""
                    onMouseEnter = { showImageIcon }
                    onMouseLeave = { hideImageIcon }
                    />

                </div>  
            </div>
            <div className="getting-started-application-template-body">
            <div className="getting-started-profile-image-info">
                <span className="brand-name">
                    This image is usually tagged on all your products you put up for sale, 
                    to help potential buyers identify products which are being sold by you.
                </span>
                </div>
                <GettingStartedPrevAndNextButtons 
                goBack = { goBack }
                customSubmitButton = { 

                    <button type="button" onClick = { ()=> handleSubmit(profileImageFile) }>
                    Continue
                    </button>
                    
                }
                />
            </div>  
        </div>
        </div>

    )

}


const ProfileImageSelector = ({ labelClassName, labelSpanClassName, label, ...props }) => {

    return (

        <label className = { labelClassName }  >

            <i>{ props.icon }</i>

            <input className = { props.inputClassName || "product-images" } { ...props } />

        </label>

    )

} 