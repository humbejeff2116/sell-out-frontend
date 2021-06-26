






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

export const AuthContext = createContext(initialAuthContext);

export default function useAuth() {
    return useContext(AuthContext);
}




