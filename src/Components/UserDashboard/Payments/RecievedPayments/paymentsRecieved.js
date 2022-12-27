
import React from 'react';
import { PaymentComp } from '../MadePayments/paymentsMade';
import './paymentsRecieved.css';

export function RecievedPaymentsCompWrapper({ payments }) {
    return (
        <>
            {payments.map((payment, i) =>
                <PaymentComp 
                key = { i } 
                { ...payment } 
                useBuyerOrderProfile= { true }
                />
            )}
        </>
    )
}