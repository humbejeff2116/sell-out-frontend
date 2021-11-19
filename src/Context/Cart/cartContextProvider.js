
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
      const cartProducts =  localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
      setCartState(cartProducts);
        return ()=>{
        } 
    }, []);

    useEffect(()=> {
          return ()=>{
            //   localStorage.setItem("cart", JSON.stringify(cartState));
          } 
    }, [cartState]);
    // function used to update context useState hooks after cart state changes
    const updateCartContextState = (state, user) => {
        const totalSum = state.length ? calculateCartTotalPrice(state) : null;
        const sellerPaymentData = state.length ? createSellerPaymentData(state, user) : {};
        const cartTotalNumberOfProducts = state.length ? calculateTotalNumberOfProductsInCart(state) : null;
        const cartItems = state.flatMap(item => item.productsUserBoughtFromSeller);
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
