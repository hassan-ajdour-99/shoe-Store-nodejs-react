import React from "react";
import classes from "./CartItems.module.css";

function CartItems({ cartItems, removeItemHandler }) {
  return (
    <div className={classes.container}>
      <div className={classes.cartItems}>
        {cartItems.map((item) => (
          <div key={item.product}>
            <h1> {item.name} </h1>
            <button onClick={() => removeItemHandler(item.product)}>
              remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CartItems;
