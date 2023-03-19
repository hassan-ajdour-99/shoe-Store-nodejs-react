import React, { useEffect } from "react";
import classes from "./LandingPage2.module.css";
import { useDispatch, useSelector } from "react-redux";
import { topProducts } from "../Actions/productActions";
import Loader from "../Layout/loader";
import Message from "../Layout/message";
import { Link } from "react-router-dom";

function LandingPage2() {
  const dispatch = useDispatch();

  const topRatedProducts = useSelector((state) => state.TopRatedProducts);
  const { loading, error, products: productsItems } = topRatedProducts;

  useEffect(() => {
    dispatch(topProducts());
  }, [dispatch]);

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.titleSide}>
          <p>-50%</p>
          <h2> BEST </h2>
          <h2> OFFER </h2>
          <p> Unlimited Discount </p>
        </div>
        <div className={classes.imageSide}>
          <img src="/images/headphone2.png" alt="" />
        </div>
        <div className={classes.titleSide}>
          <p> OFF -30 </p>
          <h2> Headphones </h2>
          <h2> Gamer </h2>
          <button> Shop Now </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage2;
