
import {  useState } from 'react';
import { GetStartedContext } from './context';
import { updateUser } from '../Utils/http.services';


export function GetStartedContextProvider(props) {
    const [profileImageFile, setProfileImageFile] = useState(null);
    const [profileImageURL, setProfileImageURL] = useState(null);
    const [registeredCompanyOrBusinessData, setRegisteredCompanyOrBusinessData] = useState(null);
    const [unregisteredBusinessData, setUnregisteredBusinessData] = useState(null);
    const [legalAddressData, setLegalAddressData] = useState(null);
    const [shippingAndOperationsData, setShippingAndOperationsData] = useState(null);
    const [operationalRegions, setOperationalRegions] = useState([]);
    const [submittedFormPaths, setSubmittedFormPaths] = useState([]);
    const getDetails = () => {
        return ({
            registeredCompanyOrBusinessData,
            unregisteredBusinessData,
            legalAddressData,
            shippingAndOperationsData,
            operationalRegions
        })
    }

    const handleSubmit = async (user, updateUserCallback, setCreatingProfile) => {
        setCreatingProfile(true);
        const companyOrBusinessData = registeredCompanyOrBusinessData ? 
        {...registeredCompanyOrBusinessData, registered: true} : {...unregisteredBusinessData, registered: true}
        const formData = new FormData();

        formData.append('user', JSON.stringify({id: user.id, userEmail: user.userEmail}));
        formData.append('companyOrBusinessData', JSON.stringify(companyOrBusinessData));
        formData.append('legalAddressData', JSON.stringify(legalAddressData));
        formData.append('shippingAndOperationsData', JSON.stringify(shippingAndOperationsData));
         formData.append('operationalRegionsData', JSON.stringify(operationalRegions));
        for (let key in profileImageFile) {
            formData.append(key, profileImageFile[key]);
        }

        try {
            const updatedUser = await updateUser(formData);
            updateUserCallback(updatedUser);  
        } catch(err) {
            console.log(err)
        } 
    }

    const removePathName = (pathname = "") => {
        const filteredPathNames = submittedFormPaths.filter(path => path.href !== pathname);
        return setSubmittedFormPaths(filteredPathNames);
    }

    const values = {
        profileImageURL: profileImageURL,
        profileImageFile: profileImageFile,
        registeredCompanyOrBusinessData: registeredCompanyOrBusinessData,
        unregisteredBusinessData: unregisteredBusinessData,
        legalAddressData: legalAddressData,
        shippingAndOperationsData: shippingAndOperationsData,
        operationalRegions: operationalRegions,
        submittedFormPaths: submittedFormPaths,
        setOperationalRegions: setOperationalRegions,
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