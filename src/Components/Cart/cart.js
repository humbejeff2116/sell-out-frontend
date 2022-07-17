
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GoKebabVertical } from 'react-icons/go';
import {
    reduceCartProductActionPayload,
    addCartProductQuantityActionPayload,
    removeFromCartActionPayload,
} from '../../Context/Cart/cartPayloads';
import { Price } from '../Product/product';
import EmptyState, { EmptyStateButton } from '../EmptyState/emptyState';
import useCartContext from '../../Context/Cart/cartContext';
import useAuth from '../../Context/context';
import image from '../../Images/avatar4.png';
import image2 from '../../Images/product3.webp';
import bell from '../../Images/bell3.png';
import './cart.css';



export default function Cart({ 
    dontShowHeading,
    emptyCartHref,
    emptyCartContainerClassName,
    ...props 
}) {
    const { cartItems, cartState } = useCartContext();
    let CartProductsComponent;
    
    if (cartItems.length > 0) {
        CartProductsComponent = (
           <CartProductsWrapper 
           cartData = { cartState } 
           dontShowHeading = { dontShowHeading }
           />
        )
    } else {
        CartProductsComponent = (
            <EmptyCart
            href = { emptyCartHref }
            emptyCartContainerClassName ={ emptyCartContainerClassName }
            />
        )
    }
    return (
        <div className="cart-container">
            { CartProductsComponent }
        </div>
    )
}

function CartProductsWrapper({ dontShowHeading, cartData }) {
    const { cartState, cartItems, totalSum } = useCartContext();
    const { user, userIsLoggedIn, setOutsideLoginPopUpMessage } = useAuth();

    useEffect(()=> {
        return ()=> {
            if (user) {
                if (cartItems?.length > 0 && cartState?.length > 0) {
                    const currentCartState = {
                        cartState,
                        currentUser: user,
                    }
                    localStorage.setItem(`${user.userEmail}-cart`, JSON.stringify(currentCartState));
                } else {
                    localStorage.removeItem(`${user.userEmail}-cart`);
                }    
            }
        }
    },[cartState, cartItems, user]);

    const goToCheckout =(e) => {
        if (!userIsLoggedIn) {
            e.preventDefault();
            const message = {
                type: "unAuthenticated",
                show: true,
                // message: "Hi, kindly login to checkout in a more secured environment"
                message: "Hi, kindly login to perform checkout"
            }
            setOutsideLoginPopUpMessage(message, true);
            return;
        }
    }

    return (
        <div className="cart-products-wrapper">
            <div className="cart-products-container">
                {
                    dontShowHeading ? ""  : (
                        <div className="cart-header">
                            <h3>Cart</h3>
                        </div>
                    )
                }
                <div className="cart-products-panel">
                { 
                    cartData.map(({ products, ...rest }) => (
                        products.map((product, i) => 
                            <CartProduct 
                            key={ i } 
                            product={ product }
                            { ...rest }
                            />
                        )
                    ))
                }
                </div>
                <div className="cart-products-total-panel">
                    <div className="cart-products-total-checkout">
                        <div className="cart-products-total-amount">
                            <span className="cart-products-total-amount-span-bold">
                                Total amount: 
                            </span> 
                            <span> 
                                { ` £${totalSum}` }
                            </span>
                        </div>
                        <Link  onClick = { goToCheckout } to="/home/checkout"> 
                            Checkout
                        </Link>
                    </div>
                </div>
            </div>
            <div className="cart-product-checkout">
                <CartCheckoutComp onClick = { goToCheckout }/>
            </div>
        </div>
    )
}

function CartProduct({ product, ...props }) {
    const { user } = useAuth();
    const {
        cartState,
        cartItems,
        addCartProductQuantity, 
        reduceCartProductQuantity, 
        removeProductFromCart,
        updateCartContextState,
    } = useCartContext();

    const addProductQuantity = async (cartState, sellerEmail, productId, user) => {
        // setQuantity(prevState => (parseInt(prevState) + 1).toString());
        const updatedState = await addCartProductQuantity(cartState, addCartProductQuantityActionPayload(sellerEmail, productId));
        updateCartContextState(updatedState, user);
    }

    const reduceProductQuantity = async (cartState, sellerEmail, productId, user) => {
        // setQuantity(prevState => (prevState - 1).toString());
        const updatedState = await  reduceCartProductQuantity(cartState,  reduceCartProductActionPayload(sellerEmail, productId));
        updateCartContextState(updatedState, user);
    }

    const removeProduct = async (cartState, cartItems, sellerEmail, productId, user) => {
        const updatedState = await removeProductFromCart(cartState, removeFromCartActionPayload(sellerEmail, productId));
        const updatedCartItems = updatedState.flatMap(item => item.productsUserBoughtFromSeller);
        if (updatedCartItems.length < 1) {
            return updateCartContextState([], user);
        } 
        updateCartContextState(updatedState, user);

        if (cartItems.length > 0) {
            window.scrollTo(0,0)
        }
    }
// TODO... move code to library to avoid duplication
    const calculateProductSubTotal = ({ percentageOff, productPrice, productQty }) => {
        if (percentageOff) {
            const percentOffPrice = (percentageOff / 100) * Number(productPrice)
            const newPrice = Number(productPrice) - percentOffPrice;
            return ( newPrice *  productQty).toFixed(2, 10)    
        } 
        return (productPrice *  productQty).toFixed(2, 10)
    }

    return (
        <div className="cart-product-panel">
            <CartProductProfile { ...props } />
            <div className="cart-product-images-panel">
                <div className="cart-product-images">
                {
                    [product.productImages[0]].map((image, i) =>
                        <div key = { i } className="cart-product-image-group">
                            <img src = { image.src || image2 } alt="product" />
                        </div>
                    )
                }
                </div>
                {/* product information */}
                <div className="cart-product-info" >
                    <div className="cart-product-info-span-group">
                        <p>
                        { product.productName }
                        </p>
                    </div>
                    <Price {...product} className="cart-product-info-span-group" showPriceTag = { true } />
                    <div className="cart-product-info-span-group">
                        <p>Quantity: <span>{ product.productQty }</span></p>
                    </div>
                    <div className="cart-product-info-span-group">
                        <p>Sub total: <span>{ `£${ calculateProductSubTotal(product) }` }</span></p>
                    </div>
                    {/* product add/reduce/remove buttons */}    
                    <div className="cart-product-buttons" >
                        <div className="cart-product-buttons-header">
                            <span>Add/Reduce quantity</span>
                        </div>
                        <div className="cart-product-button-top">
                            <div className="cart-product-add-button">
                                <div className="cart-product-add-button-icon">
                                <button onClick={ () =>reduceProductQuantity(cartState, props.sellerEmail, product.productId, user) }>-</button>
                                </div>
                            </div>                       
                            <input  
                            value = { product.productQty }
                            onChange = { f => f }
                            className="cart-product-input" type="text" 
                            />
                            <div className="cart-product-reduce-button">
                                <div className="cart-product-add-button-icon">
                                <button onClick = { () => addProductQuantity(cartState, props.sellerEmail, product.productId, user) }>+</button>
                                </div>
                            </div>
                        </div>
                        <div className="cart-product-button-bottom">
                            <div className="cart-product-remove-button">
                                <button onClick={ () => removeProduct(cartState, cartItems, props.sellerEmail, product.productId, user) }>Remove</button>
                            </div>
                        </div>
                    </div>
                </div>  
            </div>
        </div>
    )
}

function CartProductProfile({ 
    sellerProfileImage, 
    sellerName, 
    ...props
}) {
    return (
        <div className="cart-product-avatar-Wrapper">
            <div className="cart-product-avatar" >
                <img src = { sellerProfileImage || image } alt="avatar" />
                <div className="cart-product-avatar-user-name">
                    <div> 
                        <span>{ sellerName }</span>
                    </div>
                </div>
                <div className= "cart-product-avatar-kebab">
                    <GoKebabVertical className="nav-icon"/>
                </div>
            </div>
        </div>
    )
}
 
function CartCheckoutComp({ onClick }) {
    const { totalSum, cartTotalNumberOfProducts } = useCartContext();

    return (
        <div className="cart-checkout-panel">
            <div className="cart-checkout-info">
                <div className="cart-checkout-span-group">
                    <span className="cart-checkout-span-left">Total Amount: <span className="cart-checkout-span-right">{ `£${totalSum}` }</span></span>
                </div>
                <div  className="cart-checkout-span-group">
                    <span className="cart-checkout-span-left">Item('s) In Cart: <span className="cart-checkout-span-right">{ cartTotalNumberOfProducts }</span></span>
                </div>
                <div className="cart-checkout-button-wrapper">
                    <div className="cart-checkout-button">
                        <Link to="/home/checkout" onClick = { onClick }> 
                            Checkout
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

function EmptyCart({ 
    emptyCartContainerClassName,
    href,  
    ...props
}) {
    const containerClassName = emptyCartContainerClassName ? emptyCartContainerClassName : "emptyContainer";
    const linkTo = href ? href : "/home"
    return (    
        <EmptyState
        emptyContainerClassName = { containerClassName }
        imageSrc = { bell }
        imageAlt = "Illustration of an empty cart"
        heading ="No Products In cart"
        writeUp ="You have no products in your cart at the moment"
        >
            <EmptyStateButton
            useLinkButton
            emptyStateButtonText="View products"
            href = { linkTo }
            />
        </EmptyState>
    )
}