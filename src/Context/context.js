
import { createContext, useContext } from 'react';

export const MyContext = createContext();

const initialAuthContext = {
    user: null,
    userIsLoggedIn: null,
    token: null,
    tokenExpiration: null,
    viewUserProfileData: null,
    outsideLoginPopUpMessage: null,
    setOutsideLoginPopUpMessage: ()=>{},
    setUserData: ()=>{},
    setUserIsLoggedIn: ()=>{},
    setTokenData: () =>{},
    isAuthenticated: ()=>{},
    setViewUserProfileData: ()=>{},
    logOut: ()=>{},
    wipeToken: ()=>{}
}

const initialGetStartedContext = {
    registeredCompanyOrBusinessData: null,
    unregisteredBusinessData: null,
    legalAddressData: null,
    shippingAndOperationsData: null,
    operationalRegions: [],
    profileImageFile: null,
    profileImageURL: null,
    submittedFormPaths: [],
    setRegisteredCompanyOrBusinessData: () => {},
    setUnregisteredBusinessData: () => {},
    setLegalAddressData: () => {},
    setShippingAndOperationsData: () => {},
    setOperationalRegions: () => {},
    setProfileImageFile: () => {},
    setProfileImageURL: () => {},
    setSubmittedFormPaths: () => {},
    removePathName: () => {},
    handleSubmit: ()=> {},
    getDetails: ()=>{},
}

export const AuthContext = createContext(initialAuthContext);
export const GetStartedContext = createContext(initialGetStartedContext);
export default function useAuth() {
    return useContext(AuthContext);
}
export  function useGetStartedContext() {
    return useContext(GetStartedContext);
}