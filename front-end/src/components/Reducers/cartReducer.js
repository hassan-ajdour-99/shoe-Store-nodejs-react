import {
  ADD_TO_CART_ITEM,
  REMOVE_FROM_CART_ITEM,
  RESET_CART_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from "../Constants/cartConstant";

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {}, PaymentMethod: {} },
  action
) => {
  switch (action.type) {
    case ADD_TO_CART_ITEM:
      const item = action.payload;

      const existItem = state.cartItems.find((x) => x.product === item.product);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, item] };
      }
    case REMOVE_FROM_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
    case RESET_CART_ITEM:
      return { cartItems: [] };
    // SAVE SHIPPING ADDRESS
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };

    // SAVE PAYMENT METHODS
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        savePaymentMethod: action.payload,
      };

    default:
      return state;
  }
};
