








import {useEffect, useState } from 'react';
import { CartContext } from './cartContext';

import {
    calculateSellerTotalSum, 
    calculateCartTotalPrice, 
    clearCart, 
    reduceCartProductQuantity, 
    addCartProductQuantity,
    addProductToCart,
    removeProductFromCart ,
    calculateTotalNumberOfProductsInCart 
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

export default function CartContextProvider(props) {
    const [cartState, setCartState] = useState(null);
    const [cartTotalNumberOfProducts, setCartTotalNumberOfProducts] = useState(null);
    const [totalSum, setTotatSum] = useState(null);
    const [sellerTotalSumData, setSellerTotalSumData] = useState(null);
    
    useEffect(()=> {
      const cartProducts =  localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : null;
      setCartState(cartProducts);
        return ()=>{
            localStorage.setItem("cart", JSON.stringify(cartState));
        } 
    }, [cartState]);
    // function used to update context useState hooks after cart state changes
    const updateContextState = (state) => {
        const totalSum = state.length ? calculateCartTotalPrice(state) : 0;
        const sellerTotalSumData = state.length ? calculateSellerTotalSum(state) : {};
        const cartTotalNumberOfProducts = state.length ? calculateTotalNumberOfProductsInCart(state) : 0;
        setCartState(state);
        setTotatSum(totalSum);
        setSellerTotalSumData(sellerTotalSumData);
        setCartTotalNumberOfProducts(cartTotalNumberOfProducts);
    }
    const values = {
        cartState: cartState,
        toatalSum: totalSum,
        cartTotalNumberOfProducts: cartTotalNumberOfProducts,
        sellerTotalSumData: sellerTotalSumData,
        updateContextState: updateContextState,
        addProductToCart: addProductToCart,
        removeProductFromCart: removeProductFromCart,
        addCartProductQuantity: addCartProductQuantity,
        reduceCartProductQuantity: reduceCartProductQuantity,
        clearCart: clearCart,  
    }

    return (
        <CartContext.Provider value={values} >
            {props.children}
        </CartContext.Provider>
    )
}

// addProductToCart()
// .then(products => {
//     return cartStateUpdater(products)
// })