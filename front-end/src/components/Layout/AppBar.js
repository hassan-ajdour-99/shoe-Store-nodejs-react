import React from "react";
import classes from "./AppBar.module.css";
import { Link } from "react-router-dom";

function AppBar() {
  return (
    <div className={classes.header}>
      <div className={classes.AppBar}>
        <Link to="/">
          <div className={classes.logo}>
            <img src="/images/logo.png" alt="" />
          </div>
        </Link>
        <div className={classes.contact}>
          <div className={classes.items}>
            <h3> Free Shipping </h3>
          </div>
          <div className={classes.items}>
            <h3> Fast Delivery </h3>
          </div>
          <div className={classes.items}>
            <h3> Sale Rabat Morocco </h3>
          </div>
          <div className={classes.socialMedia}>
            <span className={classes.fontAwesome}>
              <span>
                <a href="https://www.instagram.com/shooopygames/">
                  <i class="fab fa-instagram fa-2x"></i>
                </a>
              </span>
              <span>
                <a href="https://www.facebook.com/Shoppy-games-107072555408340">
                  <i class="fab fa-facebook fa-2x"></i>
                </a>
              </span>
            </span>
          </div>
          <div className={classes.items}>
            <h3> +212691752429 </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppBar;
