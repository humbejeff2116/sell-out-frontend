

import {useEffect, useState } from 'react';
import { GetStartedContext } from './context';
import {updateUser} from '../Utils/http.services';


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
    }
    const getDetails = () => {
        return ({
            contactEmail: contactData ? contactData.contactEmail : '',
            contactNumber: contactData ? contactData.contactNumber : '',
            country: locationData ? locationData.country : '',
            city: locationData ? locationData.city : '',
            address: locationData ? locationData.address : '',
        })
    }

    const handleSubmit = (profileImage, user, errorCallback, successCallback) => {
        if (!profileImage) {
            return  errorCallback("please provide a profile picture")
        }
        const values = {...contactData,...locationData,...profileImage}
        const formData = new FormData();
        formData.append('userEmail' , user.userEmail);
        formData.append('userId' , user.id);
        const formValuesArr = Object.keys(values).map( keys => ({name: keys, value: values[keys]}));
        console.log("values are",formValuesArr)
        for (let i = 0; i < formValuesArr.length; i++) {
            formData.append(formValuesArr[i].name , formValuesArr[i].value);
        }
        updateUser(formData)
        .then(response => {
            
        })
        .then(user => {
            // TODO... pass user response to succescallback here

        })
        .catch(e => console.error(e.stack));
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
        setIsProfileDataSet: setIsProfileDataSet,
        handleSubmit: handleSubmit,
        getDetails: getDetails
    }

    return(
        <GetStartedContext.Provider value={values} >
            {props.children}
        </GetStartedContext.Provider>
    )
}