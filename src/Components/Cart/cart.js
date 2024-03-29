
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GoKebabVertical } from 'react-icons/go';
import { RiDeleteBin2Line, RiEye2Line } from 'react-icons/ri';
import {
    reduceCartProductActionPayload,
    addCartProductQuantityActionPayload,
    removeFromCartActionPayload,
} from '../../Context/Cart/cartPayloads';
import { Price } from '../Product/product';
import EmptyState, { EmptyStateButton } from '../EmptyState/emptyState';
import { UserModalProfileWrapper } from '../ModalUserProfile/userProfile';
import useCartContext from '../../Context/Cart/cartContext';
import useAuth from '../../Context/context';
import image from '../../Images/avatar4.png';
import image2 from '../../Images/product3.webp';
import failureImage from '../../Images/failure9.jpg';
import './cart.css';


export default function Cart({ 
    dontShowHeading,
    emptyCartHref,
    emptyCartContainerClassName 
}) {
    const { cartItems, cartState } = useCartContext();

    return (
        <div className="cart-container">
        {(cartItems.length > 0) ? (
            <CartProductsWrapper 
            cartData = { cartState } 
            dontShowHeading = { dontShowHeading }
            />
        ) : (
            <EmptyCart
            href = { emptyCartHref }
            emptyCartContainerClassName = { emptyCartContainerClassName }
            />
        )}
        </div>
    )
}

function CartProductsWrapper({ 
    dontShowHeading, 
    cartData 
}) {
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

    const goToCheckout = (e) => {
        if (!userIsLoggedIn) {
            e.preventDefault();
            const message = {
                type: "unAuthenticated",
                show: true,
                message: "Hi, kindly login to perform checkout"
            }
            setOutsideLoginPopUpMessage(message, true);  
        }
    }

    return (
        <div className="cart-products-wrapper">
            <div className="cart-products-container">
                {dontShowHeading ? "" : (
                    <div className="cart-header">
                        <h3>Cart</h3>
                    </div>
                )}
                <div className="cart-products-panel">
                {cartData.map(({ products, ...rest }) => (
                    products.map((product, i) => 
                        <CartProduct 
                        key = { i } 
                        product = { product }
                        { ...rest }
                        />
                    )
                ))}
                </div>
                <div className="cart-products-total-panel">
                    <div className="cart-products-total-checkout">
                        <div className="cart-products-total-amount">
                            <span className="cart-products-total-amount-span-bold">
                                Total amount: 
                            </span> 
                            <span> 
                                { `£${totalSum}` }
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

function CartProduct({ 
    product, 
    ...props 
}) {
    const { user } = useAuth();
    const {
        cartState,
        cartItems,
        addCartProductQuantity, 
        reduceCartProductQuantity, 
        removeProductFromCart,
        updateCartContextState,
    } = useCartContext();

    const addProductQuantity = async (
        cartState, 
        sellerEmail, 
        productId, 
        user
    ) => {
        // setQuantity(prevState => (parseInt(prevState) + 1).toString());
        // NOTE: await has an effect on expression
        const updatedState = await addCartProductQuantity(
            cartState, 
            addCartProductQuantityActionPayload(sellerEmail, productId)
        );
        updateCartContextState(updatedState, user);
    }

    const reduceProductQuantity = async (
        cartState, 
        sellerEmail, 
        productId, 
        user
    ) => {
        // setQuantity(prevState => (prevState - 1).toString());
        const updatedState = await reduceCartProductQuantity(
            cartState,  
            reduceCartProductActionPayload(sellerEmail, productId)
        );
        updateCartContextState(updatedState, user);
    }

    const removeProduct = async (
        cartState, 
        cartItems, 
        sellerEmail, 
        productId, 
        user
    ) => {
        const updatedState = await removeProductFromCart(
            cartState, 
            removeFromCartActionPayload(sellerEmail, productId)
        );
        const updatedCartItems = updatedState.flatMap(item => item.productsUserBoughtFromSeller);
        if (updatedCartItems.length < 1) {
            return updateCartContextState([], user);
        } 
        updateCartContextState(updatedState, user);

        if (cartItems.length > 0) {
            window.scrollTo(0,0);
        }
    }
// TODO... move code to library to avoid duplication
    const calculateProductSubTotal = ({ 
        percentageOff, 
        productPrice, 
        productQty 
    }) => {
        if (percentageOff) {
            const percentOffPrice = (percentageOff / 100) * Number(productPrice);
            const newPrice = Number(productPrice) - percentOffPrice;

            return (newPrice * productQty).toFixed(2, 10);    
        } 

        return (productPrice * productQty).toFixed(2, 10);
    }

    return (
        <div className="cart-product-panel">
            <CartProductProfile { ...props }/>
            <div className="cart-product-details-panel">
                <div className="cart-product-image-container">
                {/*TODO... return random image */}
                {[product.productImages[0] || {}].map((image, i) => 
                    <div key = { i } className="cart-product-image-wrapper">
                        <img src = { image?.src || image2 } alt="product"/>
                    </div>
                )}
                </div>
                {/* product information */}
                {/* TODO... extract */}
                <div className="cart-product-details-container" >
                    <div className="cart-product-details-child">
                        <div>{ product.productName }</div>
                    </div>
                    <Price { ...product } className="cart-product-details-child cart-product-details-price"/>
                    <div className="cart-product-details-child">
                        <div>Quantity: <span>{ product.productQty }</span></div>
                    </div>
                    <div className="cart-product-details-child">
                        <div>Sub total: <span>{ `£${calculateProductSubTotal(product)}` }</span></div>
                    </div>
   
                    <div className="cart-product-details-child cart-product-buttons">
                        <button 
                        className="cart-product-button-icon"
                        onClick = {() => reduceProductQuantity(
                            cartState, 
                            props.sellerEmail, 
                            product.productId, 
                            user
                        )}
                        >
                            -
                        </button>                     
                        <input  
                        value = { product.productQty }
                        onChange = { f => f }
                        className="cart-product-input" type="text" 
                        />
                        <button 
                        className="cart-product-button-icon"
                        onClick = {()=> addProductQuantity(
                            cartState, 
                            props.sellerEmail, 
                            product.productId, 
                            user
                        )}
                        >
                            +
                        </button>
                    </div>
                    <div className="cart-product-details-child cart-product-remove-button">
                        <button 
                        onClick = {()=> removeProduct(
                            cartState, 
                            cartItems, 
                            props.sellerEmail, 
                            product.productId, 
                            user
                        )}>
                            <RiDeleteBin2Line className="cart-delete-icon"/>
                            Remove
                        </button>
                    </div>
                </div>  
            </div>
        </div>
    )
}

function CartProductProfile({ 
    sellerProfileImage, 
    sellerName,
    sellerId,
    sellerEmail, 
    ...props
}) {
    const [showUserProfileModal, setShowuserProfileModal] = useState(false);
    const [showUserProfileModalChild, setShowUserProfileModalChild] = useState(false);
    let timer = null;

    useEffect(() => {
        return () => {
            if (timer) clearTimeout(timer);
        }
    }, [timer]);

    const showUserProfile = () => {
        setShowuserProfileModal(true);
        timer = setTimeout(() => setShowUserProfileModalChild(true));
    }

    const closeUserProfile = () => {
        setShowUserProfileModalChild(false);
        timer = setTimeout(() => setShowuserProfileModal(false), 200);
    }
    return (
        <>
        {showUserProfileModal && (
            <UserModalProfileWrapper
            handleClose = { closeUserProfile }
            userId = { sellerId }
            userEmail = { sellerEmail }
            showModalChild = { showUserProfileModalChild }
            />
        )}
        <div className="cart-product-avatar-Wrapper">
            <div className="cart-product-avatar-left">
                <div className="cart-product-avatar" >
                    <img src = { sellerProfileImage || image } alt="avatar"/>{/* TODO... remove image */}
                </div>
                <div className="cart-product-avatar-user-name">
                    <span>
                        { sellerName }
                    </span>
                </div>
            </div>
            <div className="cart-product-avatar-right">
                <GoKebabVertical className="nav-icon" onClick = { showUserProfile }/>
            </div>
        </div>
        </>
    )
}
 
function CartCheckoutComp({ 
    onClick 
}) {
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
    href
}) {
    return (    
        <EmptyState
        emptyContainerClassName = { emptyCartContainerClassName || "emptyContainer" }
        imageSrc = { failureImage }
        imageAlt = "Illustration of an empty cart"
        heading = "No Items In cart"
        writeUp = "You currently do not have items in your cart"
        >
            <EmptyStateButton
            useLinkButton
            buttonIcon = {
                <RiEye2Line className="empty-cart-button-icon"/>
            }
            emptyStateButtonText="Start Shopping"
            href = { href || "/home" }
            /> 
        </EmptyState>
    )
}