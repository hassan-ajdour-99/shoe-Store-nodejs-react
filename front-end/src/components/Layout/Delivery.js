import React from "react";
import classes from "./Delivery.module.css";

function Delivery() {
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.titleSide}>
          <p> Amazing Shoes , Amazing offers for everyone! </p>
          <h2> Get Yours </h2>
          <h2> FREE </h2>
          <h2> DELIVERY </h2>
          <button> Delivery Now </button>
        </div>
        <div className={classes.imageSide}>
          <img src="/images/shoe-1.png" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Delivery;
