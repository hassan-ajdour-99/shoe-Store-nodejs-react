import React, { useState } from "react";
import { Link, Router, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import classes from "./Navbar.module.css";
import { userLogout } from "../Actions/userActions";
import SearchBox from "./SearchBox";
import CartIcon from "../Cart/CartIcons";

function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const cartTotalItems = cartItems.length;

  const { loading, error, userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(userLogout());
    console.log("logout");
  };

  const ToggleMenuHandler = () => {
    setOpenMenu(!openMenu);
  };

  const ToggleMenuHandlerY = () => {
    setOpenMenu(false);
  };

  return (
    <div className={classes.header}>
      <div className={classes.container}>
        {/* MENU */}
        <div onClick={ToggleMenuHandler}>
          {openMenu ? (
            <div className={classes.closer}>
              <img src="/images/close.png" alt="" />
            </div>
          ) : (
            <div className={classes.closer}>
              <img src="/images/menu.png" alt="" />
            </div>
          )}
        </div>
        <div className={classes.item1} onClick={ToggleMenuHandlerY}>
          <Link to="/" className={classes.link}>
            <h2 className={classes.logo}>
              <h4> OutsputStore </h4>
            </h2>
          </Link>
        </div>

        <ul
          className={classes.menu}
          style={{ display: !openMenu ? "none" : "block" }}
          onClick={ToggleMenuHandlerY}
        >
          <div className={classes.headerMenus}>
            <div>
              <Link to="/" className={classes.link}>
                <h2 className={classes.logo}>
                  <img src="/images/logo.png" alt="" />
                </h2>
              </Link>
            </div>
            <div className={classes.closer2}>
              <img src="/images/close.png" alt="" />
            </div>
          </div>
          <div>
            <Link to="/" className={classes.link}>
              <li> HOME </li>
            </Link>
          </div>
          <div>
            <Link to="/" className={classes.link}>
              <li> PRODUCTS </li>
            </Link>
          </div>
          {userInfo && (
            <div>
              <Link to="/profile" className={classes.link}>
                <li> PROFILE </li>
              </Link>
            </div>
          )}
          {userInfo && (
            <div onClick={logoutHandler}>
              <Link to="/" className={classes.link}>
                <li> LOGOUT </li>
              </Link>
            </div>
          )}
          {!userInfo && (
            <Link to="/register" className={classes.link}>
              <li className={classes.activeOne}> REGISTER </li>
            </Link>
          )}
          {!userInfo && (
            <Link to="/login" className={classes.link}>
              <li> LOGIN </li>
            </Link>
          )}
          {/* Only for Admin  */}
          {userInfo && userInfo.isAdmin && (
            <Link to="/admin/users" className={classes.link}>
              <li> USERS (admin) </li>
            </Link>
          )}
          {/* Only for Admin  */}
          {userInfo && userInfo.isAdmin && (
            <Link to="/admin/products" className={classes.link}>
              <li> PRODUCTS (admin) </li>
            </Link>
          )}
          {/* Only for Admin  */}
          {userInfo && userInfo.isAdmin && (
            <Link to="/admin/orders" className={classes.link}>
              <li> ORDERS (admin) </li>
            </Link>
          )}
        </ul>
        <div className={classes.item1} onClick={ToggleMenuHandlerY}>
          <SearchBox />
        </div>
        <div className={classes.item1} onClick={ToggleMenuHandlerY}>
          <Link to="/cart" className={classes.link}>
            <li className={classes.icon}>
              <CartIcon />
              <p className={classes.counter}>{cartTotalItems}</p>
            </li>
          </Link>
        </div>
        {/* Navbar */}
        <div className={classes.navbar}>
          <ul className={classes.item}>
            {userInfo ? (
              <Link to="/profile" className={classes.link}>
                <li> PROFILE </li>
              </Link>
            ) : (
              <Link to="/login" className={classes.link}>
                <li> LOGIN </li>
              </Link>
            )}
            {userInfo && (
              <div onClick={logoutHandler}>
                <Link to="/" className={classes.link}>
                  <li> LOGOUT </li>
                </Link>
              </div>
            )}
            {!userInfo && (
              <Link to="/register" className={classes.link}>
                <li> REGISTER </li>
              </Link>
            )}
            {/* Only for Admin  */}
            {userInfo && userInfo.isAdmin && (
              <Link to="/admin/users" className={classes.link}>
                <li> USERS </li>
              </Link>
            )}
            {/* Only for Admin  */}
            {userInfo && userInfo.isAdmin && (
              <Link to="/admin/products" className={classes.link}>
                <li> PRODUCTS </li>
              </Link>
            )}
            {/* Only for Admin  */}
            {userInfo && userInfo.isAdmin && (
              <Link to="/admin/orders" className={classes.link}>
                <li> ORDERS </li>
              </Link>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
