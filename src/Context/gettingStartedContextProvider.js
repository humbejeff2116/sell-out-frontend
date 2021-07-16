

import {useEffect, useState } from 'react';
import socket from '../Components/Socket/socket';
import { GetStartedContext } from './context';


export function GetStartedContextProvider(props) {
    const [contactData, setContactData] = useState(null);
    const [locationData, setLocationData] =  useState(null);
    const [profileImage, setProfileImage] = useState(null);
    const [isContactDataSet, setIsContactDataSet] = useState(false);
    const [isLocationDataSet, setIsLocationDataSet] = useState(false);
    const [isProfileDataSet, setIsProfileDataSet] = useState(false);
   

    useEffect(()=> {
       
       
    }, [contactData, locationData, profileImage]);


    const setContact = (data) => {
        setContactData(data);
        setIsContactDataSet(true);
    }
    const setLocation = (data) => {
        setLocationData(data);
        setIsLocationDataSet(true);
    }
    const setProfile = (data) => { 
        setProfileImage(data);
        setIsProfileDataSet(true);
    }
    // TODO... merge all data and send to server
    const submitGettingStartedData = (profileImage) => {

    }

    const values = {
        contactData: contactData,
        locationData: locationData,
        profileImage: profileImage,
        isContactDataSet: isContactDataSet,
        isLocationDataSet: isLocationDataSet,
        isProfileDataSet: isProfileDataSet,
        setContact: setContact,
        setLocation: setLocation,
        setProfile: setProfile,
        setIsContactDataSet: setIsContactDataSet,
        setIsLocationDataSet: setIsLocationDataSet,
        setIsProfileDataSet: setIsProfileDataSet
    }

    return(
        <GetStartedContext.Provider value={values} >
            {props.children}
        </GetStartedContext.Provider>
    )
}