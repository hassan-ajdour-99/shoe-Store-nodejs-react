import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import classes from "./payment.module.css";
import Checkout from "./Checkout";
import { savingPaymentMethod } from "../Actions/cartActions";

function Payment() {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  console.log(shippingAddress);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!shippingAddress) {
      navigate("/shipping");
    }
    if (shippingAddress === {}) {
      navigate("/shipping");
    }
  }, [navigate, shippingAddress]);

  const paypalMethod = "paypal";
  const cashMethod = "cash";

  function CashPaymentHandler(event) {
    event.preventDefault();
    // dispatch payment methods
    // dispatch(savingPaymentMethod(cashMethod));
    navigate("/placeOrder");
  }

  function PaypalPaymentHandler(event) {
    event.preventDefault();
    // dispatch payment methods
    // dispatch(savingPaymentMethod(paypalMethod));
    navigate("/placeOrder");
  }
  return (
    <div className={classes.container}>
      <h2 className={classes.header}>
        Choose Payment <span className={classes.subheader}> Method </span>
      </h2>
      <div className={classes.card}>
        <div className={classes.cartItems}>
          <Checkout step1></Checkout>
        </div>
        {/* Payment */}
        <div className={classes.payment}>
          <button className={classes.btn1} onClick={PaypalPaymentHandler}>
            Pay with Paypal
          </button>
          <button className={classes.btn2} onClick={CashPaymentHandler}>
            Pay Cash on Delivery
          </button>
        </div>
      </div>
    </div>
  );
}

export default Payment;
