import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import classes from "./PlaceOrder.module.css";
import { useNavigate } from "react-router-dom";
import { createOrderAction } from "../Actions/orderAction";
import { RESET_CART_ITEM } from "../Constants/cartConstant";
import Meta from "../Layout/Meta";

function PlaceOrder() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const paymentMethod = "Cash on Delivery";

  const TotalAmount = cartItems
    .reduce((acc, item) => acc + item.price * item.qty, 0)
    .toFixed(2);

  // GET ORDER STATE
  const ordersCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = ordersCreate;

  const placeOrderSubmitHandler = (event) => {
    event.preventDefault();
    // Dispatch create order
    dispatch(
      createOrderAction({
        username: cart.shippingAddress.name,
        orderItems: cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: paymentMethod,
        totalPrice: TotalAmount,
      })
    );
  };

  useEffect(() => {
    if (success) {
      navigate(`/orders/${order._id}`);
      dispatch({ type: RESET_CART_ITEM });
    }
  }, [dispatch, error, navigate, order, success]);

  return (
    <div className={classes.container}>
      <Meta title="Shoppy-Games | place order" />
      <div className={classes.cartItems}>
        <h2 className={classes.orderSummary}> CONFIRM ORDER </h2>
        <h3> CART ITEMS : </h3>
        {cart.cartItems.map((item) => (
          <div className={classes.item} key={item.product}>
            <div className={classes.image}>
              <img src={item.image} alt={item.name} className={classes.img} />
            </div>
            <div> {item.name} </div>
            <div> {item.price}$ </div>
            <div> Qty {item.qty} </div>
          </div>
        ))}
        <h3> TOTAL AMOUNT :</h3>
        <h3 className={classes.cart}>{TotalAmount} DH</h3>
        <div>
          <h3> SHIPPING ADDRESS : </h3>
          <h3 className={classes.cart}>
            {cart.shippingAddress.address} - {cart.shippingAddress.postalCode} -
            {cart.shippingAddress.city} - {cart.shippingAddress.country}
          </h3>
          <h3> PHONE NUMBER : </h3>
          <div className={classes.cart}>
            <h3> {cart.shippingAddress.phone} </h3>
          </div>
          <h3> PAYMENT METHOD : </h3>
          <div className={classes.cart}>
            <h3> {paymentMethod} </h3>
          </div>
          <button className={classes.btn1} onClick={placeOrderSubmitHandler}>
            Confirm order
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrder;
