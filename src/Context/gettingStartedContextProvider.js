

import {useEffect, useState } from 'react';
import socket from '../Components/Socket/socket';
import { GetStartedContext } from './context';


export function AuthContextProvider(props) {
    const [contactData, setContactData] = useState(null);
    const [locationData, setLocationData] =  useState(null);
    const [profileImage, setProfileImage] = useState(null);
    const [contactDataSet, setContactDataSet] = useState(false);
    const [locationDataSet, setLocationDataSet] = useState(false);
    const [profileDataSet, setprofileDataSet] = useState(false);
   

    useEffect(()=> {
       
       
    }, [contactData, locationData, profileImage]);


    const setContact = (data) => {
        setContactData(data);
        setContactDataSet(true);
    }
    const setLocation = (data) => {
        setLocationData(data);
        setLocationDataSet(true);
    }
    const setProfile = (data) => { 
        setProfileImage(data);
        setprofileDataSet(true);
    }
    // TODO... merge all data and send to server
    const submitGettingStartedData = () => {

    }

    const values = {
        contactData: contactData,
        locationData: locationData,
        profileImage: profileImage,
        contactDataSet: contactDataSet,
        locationDataSet: locationDataSet,
        profileDataSet: profileDataSet,
        setContact: setContact,
        setLocation: setLocation,
        setProfile: setProfile
    }

    return(
        <GetStartedContext.Provider value={values} >
            {props.children}
        </GetStartedContext.Provider>
    )
}