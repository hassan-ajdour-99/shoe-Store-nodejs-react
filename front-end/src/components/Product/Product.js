import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import classes from "./Product.module.css";
import Rating from "./Rating/Rating";
import AOS from "aos";
import "aos/dist/aos.css";

function Product({ product }) {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  return (
    <div className={classes.container}>
      <div className={classes.cards}>
        <div className={classes.card} key={product._id} data-aos="zoom-in">
          <Link to={`/product/${product._id}`}>
            <img
              src={product.image}
              alt={product.title}
              className={classes.image}
            />
          </Link>
          <div className={classes.title}> {product.name} </div>
          <div className={classes.rating}>
            <Rating value={product.rating} color={classes.color} />
          </div>
          <div className={classes.price}> {product.price}.99dh </div>
          {/* <button className={classes.detail}>
            <Link to={`/product/${product._id}`} className={classes.link}>
              View Product
            </Link>
          </button> */}
        </div>
      </div>
    </div>
  );
}

export default Product;
