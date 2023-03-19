import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import classes from "./Shipping.module.css";
import { savingShippingAddress } from "../Actions/cartActions";
import Checkout from "./Checkout";
import Meta from "../Layout/Meta";
import Message from "../Layout/message";

function Shipping() {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress, cartItems } = cart;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/cart");
    }
    if (!userInfo) {
      navigate("/login");
    }
  }, [navigate, shippingAddress, cartItems, userInfo]);

  // const [name, setName] = useState(shippingAddress.name);
  // const [phone, setPhone] = useState(shippingAddress.phone);
  // const [address, setAddress] = useState(shippingAddress.address);
  // const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  // const [city, setCity] = useState(shippingAddress.city);
  // const [country, setCountry] = useState(shippingAddress.country);
  // const [message, setMessage] = useState(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("Rabat");
  const [country, setCountry] = useState("Morocco");
  const [message, setMessage] = useState(null);

  const NameOnChangeHandler = (event) => {
    event.preventDefault();
    setName(event.target.value);
  };

  const PhoneOnChangeHandler = (event) => {
    event.preventDefault();
    setPhone(event.target.value);
  };

  const AddressOnChangeHandler = (event) => {
    event.preventDefault();
    setAddress(event.target.value);
  };

  const PostalOnChangeCodeHandler = (event) => {
    event.preventDefault();
    setPostalCode(event.target.value);
  };

  const CityOnChangeHandler = (event) => {
    event.preventDefault();
    setCity(event.target.value);
  };

  const CountryOnChangeHandler = (event) => {
    event.preventDefault();
    setCountry(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (
      name.trim("") === "" ||
      phone.trim("") === "" ||
      address.trim("") === "" ||
      postalCode.trim("") === "" ||
      city.trim("") === "" ||
      country.trim("") === ""
    ) {
      navigate("/shipping");
      setMessage("Please fill the form in order to submit your order!");
      return;
    } else {
      // Dispatch ShippingAddress
      dispatch(
        savingShippingAddress({
          name,
          phone,
          address,
          postalCode,
          city,
          country,
        })
      );
      console.log("Saving shipping address");
      navigate("/placeOrder");
    }
  };

  return (
    <div>
      {/* <Checkout step1 step2 step3 step4></Checkout> */}
      <div className={classes.container}>
        <Meta title=" Shoppy-Games | Shipping Address" />
        <div className={classes.content}>
          <div className={classes.shipping}>
            <h2 className={classes.logo}>
              <img src="/images/logo.png" alt="" />
            </h2>
            {message && <Message message={message} />}
            <form className={classes.form} onSubmit={submitHandler}>
              <div className={classes.formControl}>
                <label> Name </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  placeholder="Name"
                  onChange={NameOnChangeHandler}
                />
              </div>
              <div className={classes.formControl}>
                <label> Phone </label>
                <input
                  type="text"
                  id="phone"
                  value={phone}
                  placeholder="Phone Number"
                  onChange={PhoneOnChangeHandler}
                />
              </div>
              <div className={classes.formControl}>
                <label> Address </label>
                <input
                  type="text"
                  id="address"
                  value={address}
                  placeholder="Address"
                  onChange={AddressOnChangeHandler}
                />
              </div>
              <div className={classes.formControl}>
                <label> Code Postal </label>
                <input
                  type="text"
                  id="postalCode"
                  value={postalCode}
                  placeholder="Code Postal"
                  onChange={PostalOnChangeCodeHandler}
                />
              </div>
              <div className={classes.formControl}>
                <label> City </label>
                <input
                  type="text"
                  id="city"
                  value={city}
                  placeholder="City"
                  onChange={CityOnChangeHandler}
                />
              </div>
              <div className={classes.formControl}>
                <label> Country </label>
                <input
                  type="text"
                  id="country"
                  value={country}
                  placeholder="Country"
                  onChange={CountryOnChangeHandler}
                />
              </div>
              <button className={classes.button}>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shipping;
