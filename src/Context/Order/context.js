
import { createContext, useContext } from 'react';


const initialOrderContext = {
    placedOrders: null,
    placedOrdersSet: null,
    sellerOrderDeliveries: {},
    buyerOrderDeliveries: {},
    deliveriesSet: null,
    sellerPayments: {},
    buyerPayments: {},
    paymentsSet: null,
    setPlacedOrders: ()=> {},
    setSalesDelivery: ()=> {},
    setSalesPayments: ()=> {},
}

export const OrderContext = createContext(initialOrderContext);


export default function useOrderContext() {
    return useContext(OrderContext);
}





