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

function FilterProduct(props) {
  const dispatch = useDispatch();

  // FAIRING THE Action STATE
  const productListCategory = useSelector((state) => state.productCategory);
  const { loading, error, products } = productListCategory;

  // FAIRING THE Action STATE
  useEffect(() => {
    dispatch(getProductCategory());
  }, [dispatch]);

  // Filter By Categories
  function AccessoriesProduct(category) {
    const filterByAccessories = products.filter(
      (product) => product.category === category
    );

    return filterByAccessories.slice(0, 4);
  }

  return (
    <div className={classes.container}>
      <h2>
        <span className={classes.title}> {props.title} </span>
      </h2>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message message={error} />
      ) : (
        <div className={classes.cart}>
          {AccessoriesProduct(props.category).map((pro) => (
            <div key={pro._id} className={classes.card}>
              <Link to={`/product/${pro._id}`} className={classes.link}>
                <img src={pro.image} alt={pro.name} />
              </Link>
              {/* <h className={classes.name}> {pro.name} </h> */}
              <h2 className={classes.price}> {pro.price}dh </h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FilterProduct;
