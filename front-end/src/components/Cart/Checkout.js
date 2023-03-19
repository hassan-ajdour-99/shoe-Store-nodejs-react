import React from "react";
import classes from "./checkout.module.css";
import { Link, useNavigate } from "react-router-dom";

function Checkout({ step1, step2, step3, step4 }) {
  return (
    <div className={classes.container}>
      <h2 className={classes.header}>
        Checkout <span className={classes.subheader}> Process </span>
      </h2>
      <div className={classes.checkoutItems}>
        {step1 ? (
          <Link to="/login" className={classes.link}>
            <div className={classes.item}> Processing </div>
          </Link>
        ) : (
          <Link to="/login" className={classes.link}>
            <div className={classes.item1}> Processing </div>
          </Link>
        )}
        {step2 ? (
          <Link to="/shipping" className={classes.link}>
            <div className={classes.item}> Shipping </div>
          </Link>
        ) : (
          <Link to="/shipping" className={classes.link}>
            <div className={classes.item1}> Shipping </div>
          </Link>
        )}
        {step3 ? (
          <Link to="/payment" className={classes.link}>
            <div className={classes.item}> Payment </div>
          </Link>
        ) : (
          <Link to="/payment" className={classes.link}>
            <div className={classes.item1}> Payment </div>
          </Link>
        )}
        {step4 ? (
          <Link to="/placeorder" className={classes.link}>
            <div className={classes.item}> Done </div>
          </Link>
        ) : (
          <Link to="/placeorder" className={classes.link}>
            <div className={classes.item1}> Done </div>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Checkout;
