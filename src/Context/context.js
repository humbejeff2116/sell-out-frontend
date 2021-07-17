






import { createContext, useContext } from 'react';

export const MyContext = createContext();

const initialAuthContext = {
    user: null,
    token: null,
    tokenExpiration: null,
    setUserData: ()=>{},
    setTokenData: () =>{},
    isAuthenticated: ()=>{},
}
const initialGetStartedContext = {
    contactData: null,
    locationData: null,
    profileimage: null,
    isContactDataSet: false,
    isLocationDataSet: false,
    isProfileDataSet: false,
    setIsContactDataSet: ()=> {},
    setIsLocationDataSet: ()=> {},
    setIsProfileDataSet: ()=> {},
    setContact: ()=> {},
    setLocation: ()=> {},
    setProfile: ()=> {},
    handleSubmit: ()=> {}
}

export const AuthContext = createContext(initialAuthContext);
export const GetStartedContext = createContext(initialGetStartedContext);

export default function useAuth() {
    return useContext(AuthContext);
}
export  function useGetStartedContext() {
    return useContext(GetStartedContext);
}




