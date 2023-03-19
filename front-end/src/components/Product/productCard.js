import React, { useEffect, useState } from "react";
import classes from "./productCard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { topProducts } from "../Actions/productActions";
import Loader from "../Layout/loader";
import Message from "../Layout/message";
import { Link } from "react-router-dom";
import Rating from "./Rating/Rating";

function ProductCard() {
  const dispatch = useDispatch();

  const topRatedProducts = useSelector((state) => state.TopRatedProducts);
  const { loading, error, products: productsItems } = topRatedProducts;

  useEffect(() => {
    dispatch(topProducts());
  }, [dispatch]);

  return loading ? (
    <Loader></Loader>
  ) : error ? (
    <Message message={error} style={{ background: "red" }} />
  ) : (
    <div className={classes.container}>
      <div className={classes.cards}>
        {productsItems.map((data) => (
          <div key={data._id} className={classes.productCard}>
            <img src={data.image} alt={data.name} />
            <h3> {data.name} </h3>
            <p>{data.description}</p>
            <Rating value={data.rating} />
            <Link to={`/product/${data._id}`}>
              <button className={classes.btn}> View Product </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductCard;
