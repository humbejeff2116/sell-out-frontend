



import { createContext, useContext } from 'react';


const initialCartContext = {
    cartState: null,
    toatalSum: null,
    cartTotalProducts: null,
    sellerTotalSumData: null,
    updateContextState: ()=>{},
    addProductToCart: ()=>{},
    removeProductFromCart: ()=>{},
    addCartProductQuantity: ()=>{},
    reduceCartProductQuantity: ()=>{},
    calculateCartTotalPrice: ()=>{},
    calculateSellerTotalSum: ()=>{},
    clearCart: ()=>{},  
}

export const CartContext = createContext(initialCartContext);

export  function useCartContext() {
    return useContext(CartContext);
}
