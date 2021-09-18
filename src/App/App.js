



import React from 'react';
import { AuthContextProvider } from '../Context/authContextProvider';
import { GetStartedContextProvider } from '../Context/gettingStartedContextProvider';
import { CartContextProvider } from '../Context/Cart/cartContextProvider';
import AppRoutes from '../Routes/appRoutes';

export default function App() {
   
    return (
        <AuthContextProvider >
        <GetStartedContextProvider>
        <CartContextProvider>
        <AppRoutes/>
        </CartContextProvider>
        </GetStartedContextProvider>
        </AuthContextProvider > 
    )
}