
import {useEffect, useState } from 'react';
import { CartContext } from './cartContext';

import {
    createSellerPaymentData, 
    calculateCartTotalPrice, 
    clearCart, 
    reduceCartProductQuantity, 
    addCartProductQuantity,
    addProductToCart,
    removeProductFromCart ,
    calculateTotalNumberOfProductsInCart,
    createOrderData 
}  from './contextFunctions';


export  function CartContextProvider(props) {
    const [cartState, setCartState] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [cartTotalNumberOfProducts, setCartTotalNumberOfProducts] = useState(null);
    const [totalSum, setTotatSum] = useState(null);
    const [sellerPaymentData, setSellerPaymentData] = useState(null);

    
    useEffect(()=> {

        const savedCartState =  localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : {};
        const user =  localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
        const cartStateOwner = savedCartState.currentUser
        if (savedCartState?.cartState?.length > 0) {
            const cartItems = savedCartState.cartState.flatMap(item => item.productsUserBoughtFromSeller);
            if (cartItems?.length > 0 && (user?.userEmail === cartStateOwner?.userEmail )) {
                return updateCartContextState(savedCartState?.cartState, user);
            } else {
                // return localStorage.removeItem('cart');
            }
        }
         
    }, []);

    // function used to update context useState hooks after cart state changes
    const updateCartContextState = (state, user) => {
        const totalSum = state.length ? calculateCartTotalPrice(state) : null;
        const sellerPaymentData = state.length ? createSellerPaymentData(state, user) : null;
        const cartTotalNumberOfProducts = state.length ? calculateTotalNumberOfProductsInCart(state) : null;
        const cartItems =state.length ?  state.flatMap(item => item.productsUserBoughtFromSeller) : [];
        setCartState(state);
        setCartItems(cartItems);
        setTotatSum(totalSum);
        setSellerPaymentData(sellerPaymentData);
        setCartTotalNumberOfProducts(cartTotalNumberOfProducts);
    }
    const values = {
        cartState: cartState,
        cartItems: cartItems,
        totalSum: totalSum,
        cartTotalNumberOfProducts: cartTotalNumberOfProducts,
        sellerTotalSumData: sellerPaymentData,
        updateCartContextState: updateCartContextState,
        addProductToCart: addProductToCart,
        removeProductFromCart: removeProductFromCart,
        addCartProductQuantity: addCartProductQuantity,
        reduceCartProductQuantity: reduceCartProductQuantity,
        clearCart: clearCart,
        createOrderData: createOrderData,  
    }

    return (
        <CartContext.Provider value={values} >
            {props.children}
        </CartContext.Provider>
    )
}
