
import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";
import BackButton from '../BackButton/backButton';
import { BottomPopUpBox, useBottomPopUpFor } from '../ModalBox/modalBox';
import { BottomSPinner } from '../Loader/loader';
import { Sort } from '../Reviews/reviews';
import socket from '../Socket/socket';
import useAuth from "../../Context/context";
import useCartContext from "../../Context/Cart/cartContext";
import { chekoutOptions, checkoutPaymentMethods } from '../../Data/data';
import styles from './Checkout.module.css';
import "./checkout.css";

export default function Checkout() {
  const [showPlacedOrderMessage, setShowPlacedOrderMessage] =  useState(false);
  const [error, setError] = useState(false);
  const [placedOrderMessage, setPlacedOrderMessage] = useState('');
  const [placingOrder, setPlacingOrder] = useState(false);
  const { cartState, totalSum, sellerTotalSumData, createOrderData } = useCartContext();
  const { user } = useAuth();

  useEffect(()=> {
    let mounted = true;

    socket.on('createOrderError', function(response) {
      if (mounted) {
        setPlacingOrder(false)
        const { message }  = response;
        setError(true);
        setPlacedOrderMessage(message);
        setShowPlacedOrderMessage(true);
      }
    })

    socket.on('orderCreated', function(response) {
      if (mounted) {
        setPlacingOrder(false)
        const { message }  = response;
        setError(false)
        setPlacedOrderMessage(message);
        setShowPlacedOrderMessage(true);
      }
    });

    return ()=> {
      mounted  = false
    }
  }, []);

  const placeOrder = async (cartState, sellerTotalSumData, user, orderId, orderTime = Date.now()) => {
    setPlacingOrder(true);
    try {
      const buyersPreOrder = await createOrderData(cartState, sellerTotalSumData, user, orderId, orderTime);
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
      phonenumber: user?.contactNumber,
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

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <h3>Checkout</h3>
      </div>
      {
        cartState?.length > 0 ? (
          <CheckoutWrapper
          error ={ error }
          showPlacedOrderMessage = { showPlacedOrderMessage }
          placedOrderMessage = { placedOrderMessage }
          placingOrder = { placingOrder }
          totalSum = { totalSum }
          fwConfig = { fwConfig }
          setPlacingOrder = { setPlacingOrder }
          placeOrder= { placeOrder }
          closePopUp = { closePopUp }
          />
        ) : (
          <EmptyCheckout/>
        )
      }
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
        data={chekoutOptions}
        onSelectChange ={ onSelectChange }
        sortContainerModifyClass={styles.checkoutOptionsContainer}
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

  const onSelectChange= (value) => {
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
      onSelectChange ={ onSelectChange }
      />
      <div>
      {
        <BottomSPinner
        showLoader ={ placingOrder }
        >
          Placing order...
        </BottomSPinner>
      }
      {
        <BottomPopUpBox 
        usedFor ={ error ? useBottomPopUpFor.error : useBottomPopUpFor.success }
        showPopUp={ showPlacedOrderMessage }
        message={ placedOrderMessage }
        closePopUp= { closePopUp }
        />
      }
      </div>
      <div className="checkout-body">
        <div className="checkout-body-child">
          checkout illustrstion here
        </div>

        <div className="checkout-body-child">
          {
            payOnDelivery ? (
              <PayOnDeliveryCheckout 
              />
            ) : (
              <CheckoutComp
              fwConfig ={ fwConfig }
              placeOrder ={ props.placeOrder }
              />
            )
          }

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

function CheckoutComp({  fwConfig, ...props }) {
  const { cartState, sellerTotalSumData } = useCartContext();
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
        { 
          navigator.onLine ? ( 
            <FlutterWaveButton 
            {...fwConfig} 
            /> 
          ) : ( 
            <button  // using button for test purpose only
            onClick={() =>  props.placeOrder(cartState, sellerTotalSumData, user)}
            >
              Flutterwave
            </button> 
          ) 
        }
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

function OrderDetails({  ...prop }) {
  const { totalSum, cartItems, cartTotalNumberOfProducts } = useCartContext();

  const calculateTotalOrderQuantity = (cartItems) => {
    let total = 0;
    for (let i = 0; i < cartItems.length; i++) {
      total += cartItems[i].productQty
    }
    return total;
  }

  return (
    <div className="checkout-total-wrapper">
      <div className="checkout-total">
          Total Order Products
          <div>{ cartTotalNumberOfProducts }</div>
      </div>
      <div className="checkout-total">
          Total Quantity
          <div>{ calculateTotalOrderQuantity(cartItems) }</div>
      </div>
      <div className="checkout-total">
          Total Amount
          <div>£{ totalSum }</div>
      </div>
    </div>
  )
}

function ProductsSellers({ ...props }) {
  const [loading, setLoading] = useState(false);
  const { sellerTotalSumData } = useCartContext();

  // TODO... get users from API using data from sellerTotalSumdata 
  useEffect(() => {

  }, [])

  const getUsers = (users) => {

  }
  return (
    <div>

    </div>
  )
}

function EmptyCheckout(props) {
  return (
    <>
      <BackButtonWrapper/>
      <div>
        No itesm in your checkout
      </div>
    </>
  )
}