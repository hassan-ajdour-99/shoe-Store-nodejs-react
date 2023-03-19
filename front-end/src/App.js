import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Layout/Navbar";
import Products from "./components/Product/Products";
import Footer from "./components/Layout/Footer";
import PageNotFound from "./components/Layout/PageNotFound";
import ProductDetails from "./components/Product/ProductDetails";
import Cart from "./components/Cart/Cart";
import Shipping from "./components/Cart/Shipping";
import Payment from "./components/Cart/Payment";
import PlaceOrder from "./components/Cart/PlaceOrder";
import Login from "./components/User/Login";
import Register from "./components/User/Register";
import Profile from "./components/User/Profile";
import OrderList from "./components/Order/OrderList";
import Users from "./components/User/Users";
import ProductsList from "./components/Product/ProductsList";
import UpdateProduct from "./components/Product/UpdateProduct";
import AppBar from "./components/Layout/AppBar";
import ChangePassword from "./components/User/ChangePassword";
import Order from "./components/Order/orders.js";
import Success from "./components/Order/Success";

function App() {
  return (
    <Router>
      {/* <AppBar /> */}
      <Navbar />
      <Routes>
        <Route path="*" element={<PageNotFound />} />
        <Route path="/" element={<Products />} exact />
        <Route path="/search/:keyword" element={<Products />} exact />
        <Route path="/page/:pageNumber" element={<Products />} exact />
        <Route
          path="/search/:keyword/page/:pageNumber"
          element={<Products />}
          exact
        />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />}>
          <Route path="/cart/:id" element={<Cart />} />
        </Route>
        <Route path="/payment" element={<Payment />} />
        <Route path="/success" element={<Success />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/placeOrder" element={<PlaceOrder />} />
        <Route path="/orders/:id" element={<Order />} />
        <Route path="/admin/orders" element={<OrderList />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/products" element={<ProductsList />} exact />
        <Route
          path="/admin/products/:pageNumber"
          element={<ProductsList />}
          exact
        />
        <Route path="/admin/products/:id/edit" element={<UpdateProduct />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/change-password" element={<ChangePassword />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
