



import React from 'react';
import { AuthContextProvider } from '../Context/authContextProvider';
import { GetStartedContextProvider } from '../Context/gettingStartedContextProvider';
import { CartContextProvider } from '../Context/Cart/cartContextProvider';
import { UploadProductContextProvider } from '../Context/UploadProductContext/uploadProductContextProvider';
import { ViewContextProvider } from '../Context/viewContext/viewContextProvider';
import { OrderContextProvider } from '../Context/Order/orderContextProvider';
import { EditProductContextProvider } from '../Context/EditProduct/editProductContextProvider';
import AppRoutes from '../Routes/appRoutes';

export default function App() {
   
    return (
        <AuthContextProvider >
        <GetStartedContextProvider>
        <ViewContextProvider>
        <EditProductContextProvider >
        <CartContextProvider>
        <UploadProductContextProvider>
        <OrderContextProvider>
            <AppRoutes/>
        </OrderContextProvider>
        </UploadProductContextProvider>
        </CartContextProvider>
        </EditProductContextProvider>
        </ViewContextProvider>
        </GetStartedContextProvider>
        </AuthContextProvider > 
    )
}