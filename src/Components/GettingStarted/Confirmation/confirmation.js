
import React, { useEffect, useState } from 'react';
import { Redirect, useLocation, useHistory } from 'react-router-dom';
import { BsExclamationCircle } from 'react-icons/bs';
import { BiBuildings } from "react-icons/bi";
import { RiMapPinAddLine } from "react-icons/ri";
import {FiTruck} from 'react-icons/fi';
import  { GettingStartedPrevAndNextButtons } from '../Template/template';
import { Region } from '../ShippingAndOperations/shippingAndOperations';
import { BottomSpinner } from '../../Loader/loader';
// import { BottomPopUpBox, useBottomPopUpFor } from '../../ModalBox/modalBox';
import useAuth, { useGetStartedContext } from '../../../Context/context';
import styles from './Confirmation.module.css';

const details = {
    registeredCompanyOrBusinessData: {
        countryOfIncorporation: "Country Of Incorporation",
        stateOfIncorporation: "State Of Incorporation",
        legalCompanyName: "Legal Company Name",
        yearOfFoundation: "Year Of Foundation",
        nigerianTaxId: "Nigerian Tax Id",
        taxIdClassification: "Tax Id Classification"
    },
    unregisteredBusinessData: {
        countryFoundIn: "Country Found In",
        stateFoundIn: "State Found In",
        businessOrBrandName: "Business Or Brand Name",
        YearOfFoundation: "Year Of Foundation"
    },
    legalAddressData: {
        country: "Country",
        state: "State",
        city: "City",
        address: "Address",
        postalCode: "Postal Code",
        addressLine1: "Address Line1",
        addressLine2: "Address Line2",
        companyWebsite: "Company Website"
    },
    operationalRegions: {
        state: "State",
        city: "City",
        costOfDelivery: "Cost Of Delivery"
    },
    shippingAndOperationsData: {
        state: "State",
        city: "City",
        costOfDelivery: "Cost Of Delivery",
        amount: "Amount",
        modeOfDelivery: "Mode Of Delivery",
        estimatedDeliveryDuration: "Estimated Delivery Duration",
        operationalTime: "Operational Time",
        shippingAddress: "Shipping Address",
        acceptReturns: "Accept Returns",
        conditionsForReturn: "Conditions For Return"
    }
}

export default function ProfileImage() {
    const [redirect, setRedirect] = useState('');
    const [updateUserResponseMessage, setUpdateUserResponseMessage] = useState('');
    const [creatingProfile, setCreatingProfile] = useState(false);
    const [updateUserError, setUpdateUserError] = useState(false);
    const location = useLocation();
    const history = useHistory();
    const { user, setUserData, setTokenData } = useAuth();
    const { 
        profileImageURL, 
        handleSubmit, 
        getDetails,
        removePathName 
    } = useGetStartedContext();
    let timer = null;

    useEffect(() => {  
        window.scrollTo(0, 0);

        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        }
    }, [timer]);

    const goBack = () => {
        removePathName('/getting-started/application/profile-image');
        history.push(location.pathname);
        setRedirect('/getting-started/application/profile-image');
    }

    const userUpdateSuccessful = (response) => {
        if (response?.error) {
            setCreatingProfile(false);
            setUpdateUserResponseMessage(response?.message);
            setUpdateUserError(true);
            return;
        }

        setCreatingProfile(false);
        setUpdateUserResponseMessage(response?.message);
        setUpdateUserError(false);

        timer = setTimeout(() => {
            const { data, token } = response;

            history.push(location.pathname);
            setUserData(data);
            setTokenData(token);
            setUpdateUserResponseMessage('');
            // clear session storage so as user should not be able to access getting started pages
            sessionStorage.removeItem('access-getting-started-page');
            setRedirect('/home');
        }, 2000)
    }
    
    if (redirect) {
        return (
            <Redirect to = { redirect }/>
        )
    }

    const formDetails = getDetails();
    const responseMssgConatinerClass = `getting-started-response-mssg-container ${updateUserError ? "error" : "no-error"}`;

    return (
        <div className="getting-started-application-template-container">
        {updateUserResponseMessage && (
            <ModalMessage
            modalContainerClass = { responseMssgConatinerClass }
            modalMessage = { updateUserResponseMessage }
            updateUserError = { updateUserError }
            />
        )}
        <BottomSpinner showLoader = { creatingProfile }>
            Submitting Details...
        </BottomSpinner>
        <div className="getting-started-application-template-panel">
            {/* avatar */}   
            <div className="getting-started-application-template-avatar">
                <div className="getting-started-application-template-heading">
                    <p>
                        Kindly go through and verify your details before submitting 
                    </p>
                </div>
                <div className="getting-started-application-template-profile-img">
                    <img 
                    src = { profileImageURL } 
                    alt=""
                    />
                </div>  
            </div>
            <div className="getting-started-contact-body">
                <div className="getting-started-profile-image-info">
                    {formDetails && (
                        <>
                            {/* Company/business */}
                            <CollectedDetail
                            title = {
                                <>
                                <BiBuildings className="index-side-nav-icon"/> 
                                <span>Company/Business</span>
                                </>
                            }
                            formValues = { formDetails.registeredCompanyOrBusinessData || formDetails.unregisteredBusinessData }
                            details = { formDetails.registeredCompanyOrBusinessData ? details.registeredCompanyOrBusinessData : details.unregisteredBusinessData }
                            />
                            {/* legal Address */}
                            <CollectedDetail
                            title = {
                                <>
                                <RiMapPinAddLine className="index-side-nav-icon"/>
                                <span>Legal Address</span>
                                </>
                            }
                            formValues = { formDetails.legalAddressData }
                            details = { details.legalAddressData }
                            />
                            {/* opertaions */}
                            <CollectedDetail
                            title = {
                                <>
                                <FiTruck className="index-side-nav-icon"/>
                                <span>Operations</span>
                                </>
                            }
                            topComponent = {
                                <>
                                <div className = { styles.operationLabel }>
                                    Operational regions and cost of delivery
                                </div>
                                {formDetails?.operationalRegions.length > 0 && 
                                    formDetails?.operationalRegions.map((region, i) =>
                                        <Region
                                        key = { i }
                                        { ...region }
                                        dontShowDelete
                                        />
                                )}
                                </>
                            }
                            formValues = { formDetails?.shippingAndOperationsData }
                            details = { details.shippingAndOperationsData }
                            />
                        </>
                    )}
                    <span className="brand-name">
                        All data which you have entered in this proccess can be modified or deleted at anytime, 
                        by submitting this data you are giving us consent to share it wherever your profile 
                        appears. Kindly go through our privacy policy if you haven't, 
                        to know how we use your data or how you can manage it. 
                    </span>
                </div>
                <GettingStartedPrevAndNextButtons 
                goBack = { goBack }
                customSubmitButton = {
                    <button 
                    onClick = { () => handleSubmit(user, setCreatingProfile, userUpdateSuccessful) }
                    disabled = { creatingProfile ? true : null }
                    className = { `${creatingProfile ? "disable-button" : ""}` }
                    >
                    Submit
                    </button>
                }
                />
            </div>  
        </div>
        </div>
    )
}

function CollectedDetail({
    formValues,
    title,
    details, 
    topComponent,
    ...props
}) {
    if (!formValues) {
        return null
    }
    return (
        <div className = { styles.detailsContainer }>
            <div className = { styles.detailsTitle }>
                { title }
            </div>
            { topComponent }
            <div className = { styles.detailsBody }>
                <div className = { styles.detailContainer }>
                {Object.keys(formValues).map((key, i) => {
                    if (formValues[key]) {
                        return (
                            <div className = { styles.detail } key = { i }>
                                <div>{ details[key] }</div>
                                <span>{ formValues[key] || "NA" }</span>
                            </div>
                        )
                    }
                    return null    
                } 
                )}
                </div>
            </div>
        </div>
    )
}


function ModalMessage({
    modalContainerClass, 
    modalMessage,  
    updateUserError, 
    ...props 
}) {
    if (updateUserError) {
        return (
            <div className = { modalContainerClass }>
                <BsExclamationCircle className="getting-started-mssg-icon"/>
                <span>{ modalMessage  }</span>
                { props.children || '' }
            </div>
        )
    }

    return (
        <div className = { modalContainerClass }>
            {/* TODO... change icon to success icon */}
            <BsExclamationCircle className="getting-started-mssg-icon"/>
            <span>{ modalMessage }</span>
            { props.children || '' }
        </div>
    )
} 