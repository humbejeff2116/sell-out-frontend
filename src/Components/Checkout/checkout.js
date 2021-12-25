

import React, { useState } from "react";
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";
import socket from '../Socket/socket';
import useAuth from "../../Context/context";
import useCartContext from "../../Context/Cart/cartContext";
import BackButton from '../BackButton/backButton';
import { createOrder } from '../../Utils/http.services';
import "./checkout.css";

export default function Checkout(props) {
  const [placedOrderMessage, setPlacedOrderMessage] = useState('');
  const [error, setError] = useState(null);
  const {
    cartState,
    totalSum,
    sellerTotalSumData,
    createOrderData,
  } = useCartContext();
  const { user } = useAuth();
  let CheckoutComponent;

  const placeOrder = async (cartState, sellerTotalSumData, user, orderId, orderTime) => {
    try {
      const buyersPreOrder = await createOrderData(cartState, sellerTotalSumData, user, orderId, orderTime);
      const placedOrder = await createOrder(buyersPreOrder);
      setPlacedOrderMessage(placedOrder?.message);
    }  catch(err) {

    } 
  };
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
  };

  const fwConfig = {
    ...config,
    text: "Pay with Flutterwave",
    callback: async (response) => {
      alert(JSON.stringify(response));
      console.log(response);
      // TODO... call the placeOrder function here if response status is 200
      await placeOrder(cartState, sellerTotalSumData, user);
      closePaymentModal(); // this will close the modal programmatically
    },
    onClose: () => {},
  };
  if (cartState.length > 0) {
    CheckoutComponent = (
      <CheckoutComp
      placedOrderMessage = { placedOrderMessage }
      totalSum = { totalSum }
      />
    )
  } else {
    CheckoutComponent = (
      <EmptyCheckout/>
    )
  }

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <h3>Checkout</h3>
      </div>
      <div className="checkout-back-button-container">
        <BackButton buttonWrapperClassName="checkout-back-button"/>
      </div>
      { CheckoutComponent }
    </div>
  );
}

function CheckoutComp({ placedOrderMessage, totalSum }) {
  return (
    <>
      <div>
      {
          placedOrderMessage && (
            <MessagePopup message = { placedOrderMessage } />
          )
        }

      </div>

      <div className="checkout-body">
        <div className="checkout-content">
          <span>Total payment amount: <span>£{totalSum}</span></span>
        </div>
        <div className="checkout-para">
          <p>Make payment using</p>
        </div>

        <div className="checkout-button-wrapper">
          <div className="checkout-button">
            {/* TODO... replace button with flutterwave button */}
          <button>Flutterwave</button>
          {/* <FlutterWaveButton {...fwConfig} /> */}
          </div>
        </div>

        <div className="checkout-para">
          <p>or</p>
        </div>

        <div className="checkout-button-wrapper">
          <div className="checkout-button">
            <button>Paystack</button>
          </div>
        </div>

      </div>
    </>
  )
}


function MessagePopup({ message }) {
  return (
    <div>
      <p>{ message }</p>
    </div>
  )
}


function EmptyCheckout(props) {
  return (
    <div>
      No itesm in your checkout
    </div>

  )
}
