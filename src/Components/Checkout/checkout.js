import React from "react";
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";
import socket from '../Socket/socket';
import useAuth from "../../Context/context";
import useCartContext from "../../Context/Cart/cartContext";
import "./checkout.css";

export default function Checkout(props) {
  const {
    cartState,
    cartItems,
    totalSum,
    cartTotalProducts,
    sellerTotalSumData,
    createOrderData,
  } = useCartContext();
  const { user } = useAuth();

  const createOrder = async (
    cartState,
    sellerTotalSumData,
    orderId,
    orderTime
  ) => {
    const buyersPreOrder = await createOrderData(
      cartState,
      sellerTotalSumData,
      orderId,
      orderTime
    );
    // TODO... emit order details to db after buyer has paid
  };

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
    text: "Pay with Flutterwave!",
    callback: async (response) => {
      console.log(response);
      // TODO... call the createOrder function here
      await createOrder(cartState, sellerTotalSumData);
      closePaymentModal(); // this will close the modal programmatically
    },
    onClose: () => {},
  };

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <h3>Checkout</h3>
      </div>
      <div className="checkout-back-button-container">
        <div className="checkout-back-button">
          <button>Go back</button>
        </div>
      </div>

      <div className="checkout-body">
        <div className="checkout-content">
          {/* <p>Total items in cart: <span>4</span></p> */}
          <span>Total payment amount: <span>£30.88</span></span>
        </div>
        <div className="checkout-para">
          <p>Make payment using</p>
        </div>

        <div className="checkout-button-wrapper">
          <div className="checkout-button">
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
    </div>
  );
}
