
import { useState, useEffect } from 'react';
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

export  function CartContextProvider({ children }) {
    const [cartState, setCartState] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [cartTotalNumberOfProducts, setCartTotalNumberOfProducts] = useState(null);
    const [totalSum, setTotatSum] = useState(null);
    const [sellerPaymentData, setSellerPaymentData] = useState(null);

    useEffect(() => {
        const user = localStorage.getItem(`user`) ? JSON.parse(localStorage.getItem(`user`)) : null;
        const savedCartState =  localStorage.getItem(`${user?.userEmail}-cart`) ? (
            JSON.parse(localStorage.getItem(`${user?.userEmail}-cart`))
        ) :( 
            null
        );

        if (!user || !savedCartState) {
            return;
        }
        const currentUserIsCartOwner = savedCartState.currentUser.userEmail === user.userEmail;

        if (!currentUserIsCartOwner) {
            return;
        }

        updateCartContextState(savedCartState?.cartState, user);
    }, []);

    // function used to update context useState hooks after cart state changes
    const updateCartContextState = (state, user) => {
        const totalSum = state.length ? calculateCartTotalPrice(state) : null;
        const sellerPaymentData = state.length ? createSellerPaymentData(state, user) : null;
        const cartTotalNumberOfProducts = state.length ? calculateTotalNumberOfProductsInCart(state) : null;
        const cartItems =state.length ?  state.flatMap(item => item.products) : [];

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
            { children }
        </CartContext.Provider>
    )
}