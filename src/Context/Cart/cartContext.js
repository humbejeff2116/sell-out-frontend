



import { createContext, useContext } from 'react';


const initialCartContext = {
    cartState: [],
    cartItems: [],
    totalSum: null,
    cartTotalProducts: null,
    sellerTotalSumData: null,
    updateCartContextState: ()=>{},
    addProductToCart: ()=>{},
    removeProductFromCart: ()=>{},
    addCartProductQuantity: ()=>{},
    reduceCartProductQuantity: ()=>{},
    calculateCartTotalPrice: ()=>{},
    calculateSellerTotalSum: ()=>{},
    createOrderData: ()=>{},
    clearCart: ()=>{},  
}

export const CartContext = createContext(initialCartContext);

export default  function useCartContext() {
    return useContext(CartContext);
}
