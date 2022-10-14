
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
        ) : ( 
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
        const isArray = (item) => {
            return Array.isArray(item);
        }

        if (!isArray(state)) {
            throw new Error("state must be an array");
        }

        if (state.length < 1) {
            setCartState([]);
            setCartItems([]);
            setCartTotalNumberOfProducts(null);
            setTotatSum(null);
            setSellerPaymentData(null);
            return;
        }

        const cartItems = state.flatMap(item => item.products);
        const cartTotalNumberOfProducts = calculateTotalNumberOfProductsInCart(state);
        const totalSum = calculateCartTotalPrice(state);
        const sellerPaymentData = user ? createSellerPaymentData(state, user) : null;
        
        setCartState(state);
        setCartItems(cartItems);
        setCartTotalNumberOfProducts(cartTotalNumberOfProducts);
        setTotatSum(totalSum);
        setSellerPaymentData(sellerPaymentData);  
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
        <CartContext.Provider value = { values }>
            { children }
        </CartContext.Provider>
    )
}