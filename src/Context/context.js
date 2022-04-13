
import { createContext, useContext } from 'react';

export const MyContext = createContext();

const initialAuthContext = {
    user: null,
    token: null,
    tokenExpiration: null,
    viewUserProfileData: null,
    setUserData: ()=>{},
    setTokenData: () =>{},
    isAuthenticated: ()=>{},
    setViewUserProfileData: ()=>{},
    logOut: ()=> {},
}

const initialGetStartedContext = {
    registeredCompanyOrBusinessData: null,
    unregisteredBusinessData: null,
    legalAddressData: null,
    shippingAndOperationsData: null,
    profileImageFile: null,
    profileImageURL: null,
    submittedFormPaths: [],
    setRegisteredCompanyOrBusinessData: () => {},
    setUnregisteredBusinessData: () => {},
    setLegalAddressData: () => {},
    setShippingAndOperationsData: () => {},
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