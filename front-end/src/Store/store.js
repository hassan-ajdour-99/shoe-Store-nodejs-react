import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducer,
  productCategoryReducer,
  productDetailReducer,
  deleteProductReducer,
  CreateProductReducer,
  updateProductReducer,
  productCreateReviewReducer,
  productTopRatedReducer,
} from "../components/Reducers/productReducers";
import { cartReducer } from "../components/Reducers/cartReducer";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
} from "../components/Reducers/userReducer";
import {
  createOrderReducer,
  orderDetailsReducer,
  getAllOrders,
  AllOrdersAdminReducer,
  orderUpdatePayment,
  orderUpdateDelivery,
  deleteOrderReducer,
} from "../components/Reducers/orderReducer";

// All Reducers States
const reducer = combineReducers({
  createdNewProduct: CreateProductReducer,
  productList: productListReducer,
  productCategory: productCategoryReducer,
  productDetails: productDetailReducer,
  productDelete: deleteProductReducer,
  updateProduct: updateProductReducer,
  createProductReview: productCreateReviewReducer,
  TopRatedProducts: productTopRatedReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  orderCreate: createOrderReducer,
  deleteOrderState: deleteOrderReducer,
  orderDetails: orderDetailsReducer,
  orderToPay: orderUpdatePayment,
  orderToDeliver: orderUpdateDelivery,
  userOrders: getAllOrders,
  allOrderList: AllOrdersAdminReducer,
  allUsers: userListReducer,
  userDelete: userDeleteReducer,
});

// GET CART ITEMS FROM LOCAL STRORAGE
const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

// GET CART ITEMS FROM LOCAL STRORAGE
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

// GET Payment Method in local Storage
const ShippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const PaymentMethodFromStorage = localStorage.getItem("paymentMethod")
  ? JSON.parse(localStorage.getItem("paymentMethod"))
  : {};

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: ShippingAddressFromStorage,
    paymentMethod: PaymentMethodFromStorage,
  },

  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
