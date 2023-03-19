import {
  ADD_TO_CART_ITEM,
  REMOVE_FROM_CART_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from "../Constants/cartConstant";
import axios from "axios";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);

  dispatch({
    type: ADD_TO_CART_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty: qty,
    },
  });
  // Save all This Data In Local Storage => We can Save String In local Storage .
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// Remove Item
export const removeItemFromCart = (productId) => (dispatch, getState) => {
  dispatch({
    type: REMOVE_FROM_CART_ITEM,
    payload: productId,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// SHIPPING ADDRESS
export const savingShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });

  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

// CART_SAVE_PAYMENT_METHOD
export const savingPaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });

  localStorage.setItem("paymentMethod", JSON.stringify(data));
};
