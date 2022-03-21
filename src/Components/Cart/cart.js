
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../Context/context';
import image from '../../Images/avatar4.png';
import image2 from '../../Images/product3.webp';
import { ModalBox } from '../ModalComments/modalComments';
import useCartContext from '../../Context/Cart/cartContext';
import {
    reduceCartProductActionPayload,
    addCartProductQuantityActionPayload,
    removeFromCartActionPayload,
} from '../../Context/Cart/cartPayloads';
import { Price } from '../Product/product';
import './cart.css';

export default function Cart() {

    const { cartItems } = useCartContext();

    let CartProductsComponent;
    
    if (cartItems.length > 0) {

        CartProductsComponent = (

            <CartProductsWrapper cartData = { cartItems } />

        )

    } else {

        CartProductsComponent = (

            <EmptyCart/>

        )

    }

    return (

        <div className="cart-container">
            { CartProductsComponent }
        </div>

    )

}

function CartProductsWrapper({ cartData }) {

    const [showCartModal, setShowCartModal] = useState(false);

    const [offlinePaymentMethod, setOfflinePaymentMethod] = useState(false);

    const [confirmOfflinePaymentMethod, setConfirmOfflinePaymentMethod] = useState(false);

    const [placingOrder, setPlacingOrder] = useState(false);

    const [placeOrderUsingOfflinePayment, setPlaceOrderUsingOfflinePayment] = useState(false);

    const [placedOrderSuccess, setPlacedOrderSuccess] = useState(false);

    const [redirect, setRedirect] = useState("");

    const { cartState, cartItems, totalSum } = useCartContext();

    const { user } = useAuth();

    let CheckoutModalChildComp;

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

    const closeCartModal = () => {

        setShowCartModal(false);

        setOfflinePaymentMethod(false);

        setConfirmOfflinePaymentMethod(false)

        setPlacingOrder(false)

        setPlacedOrderSuccess(false)

    }

    const openCartModal =() => {

        setShowCartModal(true);

    }

    const handleOfflinePayment = () => {

        setOfflinePaymentMethod(true)

    }

    const handleOnlinePayment = () => {
        
    }

    const goBack = () => {

        setOfflinePaymentMethod(false);

        setConfirmOfflinePaymentMethod(false)

    }

    const confirmOfflinePayment= () => {

        setConfirmOfflinePaymentMethod(true)

        setOfflinePaymentMethod(false)

    }

    const placeOrder = () => {

        // TODO... emit order to server here and return placedOrderSuccess to true;
        setPlacingOrder(true)

    }

    if (offlinePaymentMethod) {

        CheckoutModalChildComp = (

            <CheckoutOfflinePaymentMethod
            goBack={goBack}
            confirmOfflinePayment={confirmOfflinePayment}
            />

        )

    } else if(confirmOfflinePaymentMethod) {

        CheckoutModalChildComp = (

            <ConfirmOfflinePaymentOrder
            goBack = { goBack }
            placeorder = { placeOrder }
            placingOrder = { placingOrder }
            placedOrderSuccess = { placedOrderSuccess }
            />

        )

    }else {

        CheckoutModalChildComp = (

            <CheckoutModalChild 
            handleOfflinePayment = { handleOfflinePayment }
            handleOnlinePayment = { handleOnlinePayment }
            />

        )

    }

    return (

        <div className="cart-products-wrapper">
            {

                (showCartModal) && (

                    <ModalBox 
                    handleModal = { closeCartModal } 
                    modalContainer={"cart-checkout-modal-container"}
                    >
                       { CheckoutModalChildComp }
                    </ModalBox>

                )

            }
            <div className="cart-products-container">
                <div className="cart-header">
                <h3>Cart</h3>
                </div>
                <div className="cart-products-panel">
                { 

                    cartData.map((cartItem, i) =>

                        <CartProduct key = { i } product = { cartItem } />

                    )

                }
                </div>
                <div className="cart-products-total-container">
                    <div className="cart-products-total-panel">
                        <div className="cart-products-total-amount">
                        <span className="cart-products-total-amount-span-bold">Total amount: </span> <span> { `£${totalSum}` }</span>
                        </div>
                        <div className="cart-products-total-checkout">
                            <button onClick = { openCartModal }>Checkout</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="cart-product-checkout">
                <CartCheckoutComp onClick = { openCartModal }/>
            </div>
        </div>
    )

}


function CheckoutModalChild({ handleOfflinePayment, handleOnlinePayment }) {
    return (
        <div className="cart-checkout-modal-body-container">
            <div className="cart-checkout-modal-content">
                <p>
                    {/* Kindly select how you would like to handle transaction below */}
                    How would you like to handle your payment transaction?
                </p>
            </div>
            <div className="cart-checkout-modal-buttons-container">
                <div className="cart-checkout-modal-button">
                    <button onClick = { handleOfflinePayment }>Offline</button>
                </div>
                <div className="cart-checkout-modal-button">
                   
                        <Link to="/home/checkout"> 
                        <button onClick = { handleOnlinePayment }>
                            Online
                        </button>
                        </Link>
                    
                </div>
            </div>
        </div>
    )
}
function CheckoutOfflinePaymentMethod({ goBack, confirmOfflinePayment }) {

    return(

        <div className="cart-checkout-modal-body-container">
           
           <div className="cart-checkout-modal-offline-payment-content">
                <p>
                   By using the offline payment method, all financial transactions 
                   related to this order, here off, is solely handled between 
                   you and the seller('s) outside the knowledge of this platform.
                </p>
           </div>
           <div className="cart-checkout-modal-place-order-button-container">
                <div className="cart-checkout-modal-place-order-button back">
                   <button  onClick={ goBack }>Go back</button>
                </div>
               <div className="cart-checkout-modal-place-order-button">
                   <button onClick={ confirmOfflinePayment }>Place Order</button>
                </div>
           </div>
        </div>

    )
    
}

function ConfirmOfflinePaymentOrder({ placingOrder, placedOrderSuccess, goBack, placeorder, ...props }) {

    let ConfirmOfflinePaymentOrderComp;

    if (placingOrder) {

        ConfirmOfflinePaymentOrderComp = (

            <PlacingOrder/>

        )

    } else if(placedOrderSuccess) {

        ConfirmOfflinePaymentOrderComp = (

            <PlacedOrderSuccess/>

        )

    } else {

        ConfirmOfflinePaymentOrderComp = (

            <>
            <div className="cart-checkout-modal-offline-payment-content">
                <p>
                    Are you sure you want to place order using offline payment method?
                </p>
            </div>
            <div className="cart-checkout-modal-place-order-button-container">
                <div className="cart-checkout-modal-place-order-button back">
                   <button  onClick = { goBack }>Go back</button>
                </div>
               <div className="cart-checkout-modal-place-order-button">
                   <button onClick = { placeorder }>Place Order</button>
                </div>
            </div>
            </>

        )

    }

    return (

        <div className="cart-checkout-modal-body-container">
            {ConfirmOfflinePaymentOrderComp}
        </div>

    )

}

function PlacingOrder(props) {

    return (

        <div>placing order...</div>

    )

}

function PlacedOrderSuccess(props) {

    return (

        <div>
            Order placed successfully
        </div>

    )

}

function CartProduct({ product }) {
    // alert(JSON.stringify(product, null, 2))

    const [quantity, setQuantity] = useState(""); 

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
                {/* product profile image */}
            <div className="cart-product-profile" >
                <div  className="cart-product-profile-image">
                    <img src = { product.sellerProfileImage || image} alt="avatar" />
                </div>

                <div className="cart-product-profile-info">
                    <div> <span>{ product.sellerName || ''}</span></div>
                </div>
            </div>
            {/* product image */}
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
                            <span>Quantity</span>
                        </div>
                        <div className="cart-product-button-top">
                            <div className="cart-product-add-button">
                                <div className="cart-product-add-button-icon">
                                <button onClick={ () =>reduceProductQuantity(cartState, product.sellerEmail, product.productId, user) }>-</button>
                                </div>
                            </div>
                        
                            <input  
                            value = { product.productQty }
                           onChange = { f => f }
                            className="cart-product-input" type="text" 
                            />

                            <div className="cart-product-reduce-button">
                                <div className="cart-product-add-button-icon">
                                <button onClick = { () => addProductQuantity(cartState, product.sellerEmail, product.productId, user) }>+</button>
                                </div>
                            </div>
                        </div>
                        <div className="cart-product-button-bottom">
                            <div className="cart-product-remove-button">
                                <button onClick={ () => removeProduct(cartState, cartItems, product.sellerEmail, product.productId, user) }>Remove</button>
                            </div>
                        </div>
                    </div>
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
                <span className="cart-checkout-span-left">Total Price: <span className="cart-checkout-span-right">{ `£${totalSum}` }</span></span>
                </div>

                <div  className="cart-checkout-span-group">
                <span className="cart-checkout-span-left">Item('s) In Cart: <span className="cart-checkout-span-right">{ cartTotalNumberOfProducts }</span></span>
                </div>

                <div className="cart-checkout-button-wrapper">
                    <div className="cart-checkout-button">
                        <button onClick = { onClick }>
                            Checkout
                        </button>
                    </div>
                </div>

            </div>
        </div>

    )

}

function EmptyCart(props) {

    return (
        
        <div className="empty-cart-container">
            <div className="cart-header">
                <h3>Cart</h3>
            </div>

            <div className="empty-cart-body">
                <div className="empty-cart-content">
                    <p> It seems you have no items in your cart at the moment.</p>
                    {/* <p> Products you wish to buy show up here only after you have added them.</p> */}
                </div>

                <div className="empty-cart-button">
                    <div className="empty-cart-button-wrapper">
                    <Link to="/home"><button> Let's Go Shopping</button></Link>
                    </div>
                </div>
            </div>
        </div>

    )

}