






import { createContext, useContext } from 'react';



const initialOrderContext = {
    placedOrders: null,
    soldProducts: null,
    deliveredProducts: null,
    setOrders: ()=>{},
    
}


export const OrderContext = createContext(initialOrderContext);


export default function useOrder() {
    return useContext(OrderContext);
}





