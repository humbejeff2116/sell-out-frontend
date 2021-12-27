

import { useState } from 'react';
import { OrderContext } from './context';


export function OrderContextProvider(props) {
  
    const [placedOrders, setPlacedOrders] = useState(null);
    const [soldProducts, setSoldProducts] = useState(null);
    const [deliveredProducts, setDeliveredProducts] = useState(null);
    const [paymentsMade, setPaymentsMade] = useState(null);
    const [recievedPayments, setRecievedPayments] = useState(null);

    const setOrders = ({ placedOrders, soldProducts, deliveredProducts }) => {
        setPlacedOrders(placedOrders);
        setSoldProducts(soldProducts);
        setDeliveredProducts(deliveredProducts);   
    }

    const setPayments = ({ paymentsMade, recievedPayments }) => {
        setPaymentsMade(paymentsMade);
        setRecievedPayments(recievedPayments)
    }

   
    const values = {
        placedOrders,
        soldProducts,
        deliveredProducts,
        paymentsMade,
        recievedPayments,
        setPayments,
        setOrders
    }

    return(
        <OrderContext.Provider value = { values }>
            { props.children }
        </OrderContext.Provider>
    )
}