import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProductCategory } from "../Actions/productActions";
import Loader from "../Layout/loader";
import Message from "../Layout/message";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import classes from "./FilterProduct.module.css";
import Rating from "./Rating/Rating";

function FlashCard(props) {
  const dispatch = useDispatch();

  const productListCategory = useSelector((state) => state.productCategory);
  const { loading, error, products } = productListCategory;

  useEffect(() => {
    dispatch(getProductCategory());
  }, [dispatch]);

  // Filter by categories
  function AccessoriesProduct(category) {
    const filterByAccessories = products.filter(
      (product) => product.category === category
    );
    // return filterByAccessories.slice(0, 8);
    return filterByAccessories;
  }

  const filterProductByCategory = (cat) => {
    const productCategory = products.filter((p) => p.category === cat);

    return productCategory;
  };

  return (
    <div className={classes.container}>
      <h2>
        <span> {props.title} </span>
      </h2>
      <div className={classes.cart}>
        {filterProductByCategory(props.cat).map((pro) => (
          <div key={pro._id} className={classes.card}>
            <Link to={`/product/${pro._id}`} className={classes.link}>
              <img src={pro.image} alt={pro.name} />
            </Link>
            <h3 className={classes.name}> {pro.name} </h3>
            <p className={classes.price}> {pro.price}dh </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FlashCard;
