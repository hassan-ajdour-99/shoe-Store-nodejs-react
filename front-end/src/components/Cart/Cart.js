import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { addToCart, removeItemFromCart } from "../Actions/cartActions";
import classes from "./Cart.module.css";
import Meta from "../Layout/Meta";

function Cart() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { id } = useParams();

  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const cartTotalItems = cartItems.length;

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
      console.log(id);
    }
  }, [dispatch, id, qty]);

  const removeItemFromCartHandler = (productId) => {
    console.log("remove item in the cart");
    dispatch(removeItemFromCart(productId));
  };

  const checkoutHandlerProcess = () => {
    if (userInfo) {
      navigate("/shipping");
    }

    if (!userInfo) {
      navigate("/login");
    }
  };

  return (
    <div className={classes.container}>
      <Meta title="Shoppy-Games | cart " />
      <h2 className={classes.header}>Shopping Cart</h2>
      {cartTotalItems === 0 ? (
        <h3 className={classes.header1}>
          <p> No Items added! </p>
          <p> shopping is empty </p>
        </h3>
      ) : (
        <div className={classes.card}>
          <div className={classes.cartItems}>
            {cartItems.map((pro) => (
              <div className={classes.item} key={pro.product}>
                <div className={classes.img}>
                  <img src={pro.image} alt={pro.name} className={classes.img} />
                </div>
                <Link to={`/product/${pro.product}`} className={classes.link}>
                  <div className={classes.name}>
                    <p> {pro.name} </p>
                  </div>
                </Link>
                <div className={classes.price}>
                  <p> {pro.price}$ </p>
                </div>
                <div>
                  <select
                    type="select"
                    defaultValue={qty}
                    className={classes.selector}
                    onChange={(event) =>
                      dispatch(
                        addToCart(pro.product, Number(event.target.value))
                      )
                    }
                  >
                    {[...Array(pro.countInStock).keys()].map(
                      (numOfQuntitiy) => (
                        <option
                          key={numOfQuntitiy + 1}
                          value={numOfQuntitiy + 1}
                        >
                          {numOfQuntitiy + 1}
                        </option>
                      )
                    )}
                  </select>
                </div>
                <div
                  className={classes.trash}
                  onClick={() => removeItemFromCartHandler(pro.product)}
                >
                  <span style={{ color: "red" }}>
                    <i class="fas fa-solid fa-trash"></i>
                  </span>
                </div>
              </div>
            ))}
          </div>
          {/* Payment */}
          <div className={classes.payment}>
            <div>
              <h3 className={classes.header3}>Cart Summary</h3>
              <h3 className={classes.header2}>
                All Items :
                <span className={classes.subheader}>
                  ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                </span>
              </h3>
              <h3 className={classes.header2}>
                Subtotal :
                <span className={classes.subheader}>
                  {cartItems
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(2)}
                  dh
                </span>
              </h3>
            </div>
            <button className={classes.btn1} onClick={checkoutHandlerProcess}>
              Checkout Process
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
