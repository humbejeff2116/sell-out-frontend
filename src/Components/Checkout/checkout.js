
import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { RiEye2Line } from 'react-icons/ri';
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";
import BackButton from '../BackButton/backButton';
import { BottomPopUpBox, useBottomPopUpFor } from '../ModalBox/modalBox';
import EmptyState, { EmptyStateButton } from '../EmptyState/emptyState';
import {  getShippingAddress } from '../ViewProduct/FormikComponents/formik';
import { BottomSpinner } from '../Loader/loader';
import { Sort } from '../Reviews/reviews';
import socket from '../Socket/socket';
import useAuth from "../../Context/context";
import useCartContext from "../../Context/Cart/cartContext";
import { chekoutOptions, checkoutPaymentMethods } from '../../Data/data';
import failureImage from '../../Images/failure9.jpg';
import styles from './Checkout.module.css';
import "./checkout.css";

export default function Checkout() {
  const [showPlacedOrderMessage, setShowPlacedOrderMessage] = useState(false);
  const [error, setError] = useState(false);
  const [placedOrderMessage, setPlacedOrderMessage] = useState('');
  const [placingOrder, setPlacingOrder] = useState(false);
  const [shippingAddressError, setShippingAddressError] = useState(false);
  const { cartState, totalSum, sellerTotalSumData, createOrderData } = useCartContext();
  const { user } = useAuth();

  useEffect(()=> {
    let mounted = true;

    socket.on('createOrderError', function (response) {
      if (mounted) {
        setPlacingOrder(false);
        const { message }  = response;
        setError(true);
        setPlacedOrderMessage(message);
        setShowPlacedOrderMessage(true);
      }
    })

    socket.on('orderCreated', function (response) {
      if (mounted) {
        setPlacingOrder(false);
        const { message } = response;
        setError(false);
        setPlacedOrderMessage(message);
        setShowPlacedOrderMessage(true);
      }
    });

    return () => {
      mounted = false;
    }
  }, []);

  const placeOrder = async (
    cartState, 
    sellerTotalSumData, 
    user, 
    orderId, 
    orderTime = Date.now()
  ) => {
    setPlacingOrder(true);
    // TODO... check and ensure user (buyer) sets shipping address (delivery address) 
    // await does have an effect on this expression
    const buyersPreOrder = await createOrderData(
      cartState, 
      sellerTotalSumData, 
      user, 
      orderId, 
      orderTime
    );
    try {
      alert(JSON.stringify(buyersPreOrder, null, 2)); // TODO... drop alert
      socket.emit("createOrder", buyersPreOrder);
    }  catch(err) {
      setPlacingOrder(false);
    }  
  }

  const closePopUp = () => {
    setShowPlacedOrderMessage(false); 
  }

  // TODO... return config if user is avalaible;
  const config = {
    public_key: process.env.REACT_APP_FLUTTER_WAVE_KEY,
    tx_ref: Date.now(),
    amount: totalSum,
    currency: "NGN",
    payment_options: "card, mobilemoney, ussd, account, banktransfer",
    customer: {
      email: user?.userEmail,
      contactNumber: user?.contactNumber || 'NA',
      name: user?.fullName,
    },
    customizations: {
      title: "My store",
      description: "Payment for items in cart",
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  }

  const fwConfig = {
    ...config,
    text: "Pay with Flutterwave",
    callback: async (response) => {
      alert(JSON.stringify(response, null, 2));
      console.log(response);
      // TODO... call the placeOrder function here if response status is 200
      await placeOrder(cartState, sellerTotalSumData, user);
      closePaymentModal(); // this will close the modal programmatically
    },
    onClose: () => {},
  }

  // TODO... refactor funtionality
  const isValidShippingAddress = () => {
    const sessionStoredShippingAddress = getShippingAddress();

    if (!sessionStoredShippingAddress && !userShippingAddressIsSet(user)) {
      setShippingAddressError(true);
      return;
    }
    if (sessionStoredShippingAddress) {
      const { state, city, shippingAddress } = sessionStoredShippingAddress;
      if (!(state && city && shippingAddress)) {
          setShippingAddressError(true);
          return;
      }
    }
  }

  // TODO... refactor funtionality
  const userShippingAddressIsSet = (user) => {
    if (!user) {
      return;
    }
    const { legalAddress, state, city } = user?.shippingAddress || {};
    const { shippingAddress } = user?.shippingAndOperations || {};

    if (!legalAddress && !state && !city) {
      if (hasShippingAddress(shippingAddress)) {
        return true;
      }
      return false;
    }
    return true;
    
    function hasShippingAddress(address) {
      return address ? true: false;
    }
  }

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <h3>Checkout</h3>
      </div>
      {cartState?.length > 0 ? (
        <CheckoutWrapper
        error = { error }
        showPlacedOrderMessage = { showPlacedOrderMessage }
        placedOrderMessage = { placedOrderMessage }
        placingOrder = { placingOrder }
        totalSum = { totalSum }
        fwConfig = { fwConfig }
        setPlacingOrder = { setPlacingOrder }
        placeOrder = { placeOrder }  // remove prop
        closePopUp = { closePopUp }
        />
      ) : (
        <EmptyCheckout/>
      )}
    </div>
  )
}

function BackButtonWrapper({ 
  showPaymentMethod,
  onSelectChange, 
  ...props
}) {
  return (
    <div className="checkout-back-button-container">
      <BackButton buttonWrapperClassName="checkout-back-button"/>
      {
        showPaymentMethod ? (
          <Sort
          data = { chekoutOptions }
          onSelectChange = { onSelectChange }
          sortContainerModifyClass = { styles.checkoutOptionsContainer }
          sortContainerOpenClass = { styles.checkoutOptionsContainerOpen }
          />
        ) : ""
      }
    </div>
  )
}

BackButtonWrapper.propTypes = {
  showPaymentMethod: PropTypes.bool,
  onSelectChange: PropTypes.func, 
  props: PropTypes.object
}

function CheckoutWrapper({ 
  error,
  placingOrder, 
  showPlacedOrderMessage,
  placedOrderMessage,
  closePopUp, 
  fwConfig,
  ...props 
}) {
  const [payOnDelivery, setPayOnDelivery] = useState(false);

  const onSelectChange = (value) => {
    if (value === checkoutPaymentMethods.default) {
      setPayOnDelivery(false);
      return;
    }
    setPayOnDelivery(true);
  }

  return (
    <>
      <BackButtonWrapper 
      showPaymentMethod
      onSelectChange = { onSelectChange }
      />
      <div>
      {
        <BottomSpinner
        showLoader = { placingOrder }
        >
          Placing order...
        </BottomSpinner>
      }
      {
        <BottomPopUpBox 
        usedFor = { error ? useBottomPopUpFor.error : useBottomPopUpFor.success }
        showPopUp = { showPlacedOrderMessage }
        message = { placedOrderMessage }
        closePopUp = { closePopUp }
        />
      }
      </div>
      <div className="checkout-body">
        <div className="checkout-body-child">
          checkout illustrstion here
        </div>

        <div className="checkout-body-child">
          {payOnDelivery ? (
            <PayOnDeliveryCheckout 
            />
          ) : (
            <CheckoutComp
            fwConfig = { fwConfig }
            placeOrder = { props.placeOrder } // remove prop
            />
          )}
        </div>
      </div>
    </>
  )
}

function PayOnDeliveryCheckout({ ...props }) {
  return (
    <div>
      pay on delivery
    </div>
  )
}

function CheckoutComp({ 
  fwConfig, 
  ...props 
}) {
  const { cartState, sellerTotalSumData } = useCartContext(); //TODO... remove when removing test button
  const { user } = useAuth();

  return (
    <div className="checkout-content-wrapper">
      <OrderDetails/>
      <div className="checkout-text">
        <p>Make payment using</p>
      </div>
      <div className="checkout-button-wrapper">
        <div className="checkout-button">
        {/* TODO... replace button with flutterwave button */}
        {navigator.onLine ? ( 
          <FlutterWaveButton 
          { ...fwConfig } 
          /> 
        ) : ( 
          <button  // using button for test purpose only
          onClick = { () => props.placeOrder(cartState, sellerTotalSumData, user) }
          >
            Flutterwave
          </button> 
        )}
        </div>
      </div>
      <div className="checkout-text checkout-or">
        <p>Or</p>
      </div>
      {/* TODO... use paystack payment gateway API */}
      <div className="checkout-button-wrapper">
        <div className="checkout-button">
          <button>Paystack</button>
        </div>
      </div>
    </div>
  )
}

function OrderDetails({ ...prop }) {
  const { totalSum, cartItems, cartTotalNumberOfProducts } = useCartContext();
  const calculateTotalOrderQuantity = (cartItems) => {
    let total = 0;

    for (let i = 0; i < cartItems.length; i++) {
      total += cartItems[i].productQty;
    }
    return total;
  }
  const totalOrderQnty = calculateTotalOrderQuantity(cartItems);

  return (
    <div className="checkout-total-wrapper">
      <div className="checkout-total">
          Total Order Products
          <div>{ cartTotalNumberOfProducts }</div>
      </div>
      <div className="checkout-total">
          Total Quantity
          <div>{ totalOrderQnty }</div>
      </div>
      <div className="checkout-total">
          Total Amount
          <div>£{ totalSum }</div>
      </div>
    </div>
  )
}

// function ProductsSellers({ ...props }) {
//   const [loading, setLoading] = useState(false);
//   const { sellerTotalSumData } = useCartContext();

//   // TODO... get users from API using data from sellerTotalSumdata 
//   useEffect(() => {

//   }, [])

//   const getUsers = (users) => {

//   }
//   return (
//     <div>

//     </div>
//   )
// }

function EmptyCheckout({
  emptyCartContainerClassName,
  href
}) {
  return (
    <>
      <BackButtonWrapper/>
      <EmptyState
      emptyContainerClassName = { emptyCartContainerClassName || "emptyCheckoutContainer" }
      imageSrc = { failureImage }
      imageAlt = "Illustration of an empty checkout"
      heading = "No Items In checkout"
      writeUp = "You currently do not have items in your checkout"
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
    </>
  )
}