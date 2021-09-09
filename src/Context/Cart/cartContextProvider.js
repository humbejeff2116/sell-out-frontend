
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

let state = [
    {
        sellerName:"jeffrey", 
        productsUserBoughtFromSeller: [
            {productId: 1, productPrice:300, productQty: 5}, 
            {productId: 2, productPrice:300, productQty: 2}, 
            {productId: 3, productPrice:300, productQty: 2}
        ]
    }
];

export  function CartContextProvider(props) {
    const [cartState, setCartState] = useState([]);
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
        const totalSum = state.length ? calculateCartTotalPrice(state) : 0;
        // TODO... pass user into creatSellerPaymentData function or only call function inside a component
        const sellerPaymentData = state.length ? createSellerPaymentData(state, user) : {};
        const cartTotalNumberOfProducts = state.length ? calculateTotalNumberOfProductsInCart(state) : 0;
        setCartState(state);
        setTotatSum(totalSum);
        setSellerPaymentData(sellerPaymentData);
        setCartTotalNumberOfProducts(cartTotalNumberOfProducts);
    }
    const values = {
        cartState: cartState,
        toatalSum: totalSum,
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

//e.g hoW t use addProduct context function
// addProductToCart(args)
// .then(products => {
//     return updateCartContextState(products)
// })