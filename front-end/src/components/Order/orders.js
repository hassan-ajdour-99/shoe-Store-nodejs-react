import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch, useSelector } from "react-redux";
import classes from "./orders.module.css";
import { useParams } from "react-router-dom";
import Loader from "../Layout/loader";
import Message from "../Layout/message";
import {
  getOrderDetail,
  orderUpdatePaymentAction,
  orderDeliveryAction,
} from "../Actions/orderAction";
import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from "../Constants/orderConstant";
import { RESET_CART_ITEM } from "../Constants/cartConstant";
import Meta from "../Layout/Meta";

function Order() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [sdkIsReady, setSdkIsReady] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderDetail = useSelector((state) => state.orderDetails);
  const { loading, error, order } = orderDetail;

  // Order Payment
  const orderPayment = useSelector((state) => state.orderUpdatePayment);
  const { loading: loadingPay, success: successPay } = orderDetail;

  const orderDeliver = useSelector((state) => state.orderToDeliver);
  const { success: successDeliver } = orderDeliver;

  useEffect(() => {
    const AddPaypalScript = async () => {
      const { data: ClientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${ClientId}`;
      script.async = true;
      script.onload = () => {
        setSdkIsReady(true);
      };

      document.body.appendChild(script);
    };

    if (!order || successPay) {
      dispatch(getOrderDetail(id));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        AddPaypalScript();
      } else {
        setSdkIsReady(true);
      }
    }
  }, [dispatch, id, order, successPay]);

  function onSuccessPaymentHanlder(paymentResult) {
    // console.log(paymentResult);
    if (paymentResult) {
      dispatch(orderUpdatePaymentAction(id, paymentResult));
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: RESET_CART_ITEM });
      navigate("/success");
    } else {
      console.log("something went wrong");
    }
  }

  // orderdDeliveryControlHandler
  const orderdDeliveryControlHandler = () => {
    dispatch(orderDeliveryAction(order));
    dispatch({ type: ORDER_DELIVER_RESET });
    console.log("Order delivery Successfully!");
  };

  return loading || successPay || successDeliver ? (
    <Loader />
  ) : error ? (
    <Message message={error} />
  ) : (
    <div className={classes.container}>
      {!order && (
        <Message
          message="no order"
          style={{ background: "red", color: "white" }}
        />
      )}
      <div className={classes.content}>
        <Meta title="shoppy-Games | Order Summary " />
        <div className={classes.card}>
          <h2> ORDER ID </h2>
          <p> {order._id} </p>
          <h3> User Info : </h3>
          <p> Name : {order.shippingAddress.name} </p>
          <p> Phone : {order.shippingAddress.phone} </p>
          <p> EMAIL : {userInfo.email} </p>
          <p>
            Address : {order.shippingAddress.address}-
            {order.shippingAddress.city} - {order.shippingAddress.postalCode}-
            {order.shippingAddress.country}
          </p>
          <h2> Total Amount : </h2>
          <p> {order.totalPrice} DH </p>
          <h2> ORDER PAYMENT STATUS : </h2>
          {order.isPaid && (
            <button className={classes.btn1}> Order is Paid </button>
          )}
          {!order.isPaid && (
            <button className={classes.btn}> Order Not Paid </button>
          )}
          <h3> ORDER Delivery STATUS : </h3>
          {!order.isDelivered && (
            <p className={classes.deliver}>
              {" "}
              Please check the order if It is deliovered , by Click on Check
              Order Delivery button{" "}
            </p>
          )}
          {successDeliver && <Loader></Loader>}
          {!order.isDelivered && (
            <button
              className={classes.checkButton}
              onClick={orderdDeliveryControlHandler}
            >
              {" "}
              Check Order Delivery{" "}
            </button>
          )}
          {order.isDelivered && (
            <button className={classes.btn1}> Order is Delivered </button>
          )}
          {!order.isDelivered && (
            <button className={classes.btn}> Order Not Delivered </button>
          )}
          <h3> SHOPPING ITEMS </h3>
          <div className={classes.items}>
            {order.orderItems.map((item, index) => (
              <div className={classes.item} key={index}>
                <div className={classes.img}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className={classes.img}
                  />
                </div>
                <div> {item.name} </div>
                <div> qty : {item.qty} </div>
              </div>
            ))}
          </div>
        </div>
        <div className={classes.card2}>
          <h2 className={classes.orderSummary}> ORDER SUMMARY </h2>
          <p className={classes.amount}>
            {" "}
            Total Amount :{" "}
            <span classsName={classes.totalAmount}>${order.totalPrice}</span>
          </p>
          <p className={classes.amount}>
            {" "}
            Shipping Price : 0$ - free sgippping{" "}
          </p>
          <p className={classes.amount}> Tax : 0$ </p>
          <p className={classes.amount}>
            {" "}
            Amount To Pay :{" "}
            <span classsName={classes.totalAmount}>${order.totalPrice}</span>
          </p>
          {!order.isPaid ? (
            <div className={classes.pay}>
              {loadingPay && <Loader></Loader>}
              {!sdkIsReady ? (
                <Loader />
              ) : (
                <PayPalButton
                  amount={order.totalPrice}
                  onSuccess={onSuccessPaymentHanlder}
                />
              )}
            </div>
          ) : (
            <p className={classes.paid}> Order Paid Successfully! </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Order;
