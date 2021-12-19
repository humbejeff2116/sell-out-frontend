

import { useState } from 'react';
import { OrderContext } from './context';


export function OrderContextProvider(props) {
  
    const [placedOrders, setPlacedOrders] = useState(null);
    const [soldProducts, setSoldProducts] = useState(null);
    const [deliveredProducts, setDeliveredProducts] = useState(null);
    
    const setOrders = ({placedOrders, soldProducts, deliveredProducts}) => {
        setPlacedOrders(placedOrders);
        setSoldProducts(soldProducts);
        setDeliveredProducts(deliveredProducts);   
    }

   
    const values = {
        placedOrders,
        soldProducts,
        deliveredProducts,
        setOrders
    }

    return(
        <OrderContext.Provider value = { values }>
            { props.children }
        </OrderContext.Provider>
    )
}