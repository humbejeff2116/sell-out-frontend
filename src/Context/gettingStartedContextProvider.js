
import {  useState } from 'react';
import { GetStartedContext } from './context';
import { updateUser } from '../Utils/http.services';


export function GetStartedContextProvider(props) {

    // const [personalDetailsData, setPersonalDetailsData] = useState(null);

    const [profileImageFile, setProfileImageFile] = useState(null);

    const [profileImageURL, setProfileImageURL] = useState(null);

    const [registeredCompanyOrBusinessData, setRegisteredCompanyOrBusinessData] = useState(null);

    const [unregisteredBusinessData, setUnregisteredBusinessData] = useState(null);

    const [legalAddressData, setLegalAddressData] = useState(null);

    const [shippingAndOperationsData, setShippingAndOperationsData] = useState(null);

    const [submittedFormPaths, setSubmittedFormPaths] = useState([])

    const getDetails = () => {

        return ({ })

    }

    const handleSubmit = async (user, updateUserCallback, setCreatingProfile) => {

        setCreatingProfile(true)
        // TODO... add other form values
        const values = { ...profileImageFile }

        console.log("values are", values)

        const formData = new FormData();

        formData.append('userEmail', user.userEmail);

        formData.append('userId', user.id);
        
        for (let keys in values) {

            formData.append(keys, values[keys]);

        }

        const updatedUser = await updateUser(formData)

        updateUserCallback(updatedUser)
        
    }

    const removePathName = (pathname = "") => {

        const filteredPathNames = submittedFormPaths.filter(path => path.href !== pathname);

        return setSubmittedFormPaths(filteredPathNames)

    }

    const values = {
        profileImageURL: profileImageURL,
        profileImageFile: profileImageFile,
        registeredCompanyOrBusinessData: registeredCompanyOrBusinessData,
        unregisteredBusinessData: unregisteredBusinessData,
        legalAddressData: legalAddressData,
        shippingAndOperationsData: shippingAndOperationsData,
        submittedFormPaths: submittedFormPaths,
        setRegisteredCompanyOrBusinessData: setRegisteredCompanyOrBusinessData,
        setUnregisteredBusinessData: setUnregisteredBusinessData,
        setLegalAddressData: setLegalAddressData,
        setShippingAndOperationsData: setShippingAndOperationsData,
        setProfileImageFile: setProfileImageFile,
        setProfileImageURL: setProfileImageURL,
        setSubmittedFormPaths: setSubmittedFormPaths,
        handleSubmit: handleSubmit,
        getDetails: getDetails,
        removePathName: removePathName,  
    }

    return(

        <GetStartedContext.Provider value = { values } >
            { props.children }
        </GetStartedContext.Provider>

    )

}