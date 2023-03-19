import React, { useEffect } from "react";
import classes from "./LandingPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { topProducts } from "../Actions/productActions";
import Loader from "./loader";
import Message from "./message";
import { Link } from "react-router-dom";

function LandingPage() {
  const dispatch = useDispatch();

  const topRatedProducts = useSelector((state) => state.TopRatedProducts);
  const { loading, error, products: productsItems } = topRatedProducts;

  useEffect(() => {
    dispatch(topProducts());
  }, [dispatch]);

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        {/* <div className={classes.imageSide}>
          <img src="/images/shoe-3.png" alt="" />
        </div> */}
        <h2> Amazing Shoe With Amazing price and Quality .</h2>
        <p>lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem .</p>
        <button> See What We Have </button>
        </div>
    </div>
  );
}

export default LandingPage;
