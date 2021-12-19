



import React from 'react';
import { AuthContextProvider } from '../Context/authContextProvider';
import { GetStartedContextProvider } from '../Context/gettingStartedContextProvider';
import { CartContextProvider } from '../Context/Cart/cartContextProvider';
import { UploadProductContextProvider } from '../Context/UploadProductContext/uploadProductContextProvider';
import { ViewContextProvider } from '../Context/viewContext/viewContextProvider';
import { OrderContextProvider } from '../Context/Order/orderContextProvider';
import AppRoutes from '../Routes/appRoutes';

export default function App() {
   
    return (
        <AuthContextProvider >
        <GetStartedContextProvider>
        <ViewContextProvider>
        <CartContextProvider>
        <UploadProductContextProvider>
        <OrderContextProvider>
            <AppRoutes/>
        </OrderContextProvider>
        </UploadProductContextProvider>
        </CartContextProvider>
        </ViewContextProvider>
        </GetStartedContextProvider>
        </AuthContextProvider > 
    )
}