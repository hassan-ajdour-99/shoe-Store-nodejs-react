import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import classes from "./Category.module.css";
import { getProductCategory } from "../Actions/productActions";
import Loader from "../Layout/loader";
import Message from "../Layout/message";

function Category(props) {
  const dispatch = useDispatch();

  const productListCategory = useSelector((state) => state.productCategory);
  const { loading, error, products } = productListCategory;

  // FAIRING THE Action STATE
  useEffect(() => {
    dispatch(getProductCategory());
  }, [dispatch]);

  // Filter By Categories
  function FilterCategoryOfProduct(category) {
    const filterByCategory = products.filter(
      (product) => product.category === category
    );

    return filterByCategory;
  }

  return (
    <div>
      <div className={classes.container}>
        <h2>
          <span>{props.title}</span>
        </h2>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message message={error} />
        ) : (
          <div className={classes.cards}>
            {FilterCategoryOfProduct(props.category).map((pro) => (
              <div className={classes.card} key={pro._id}>
                <Link to={`/product/${pro._id}`} className={classes.link}>
                  <img
                    src={pro.image}
                    alt={pro.name}
                    className={classes.image}
                  />
                </Link>
                <p className={classes.name}> {pro.name} </p>
                {/* <p className={classes.price}> {pro.price}dh </p> */}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Category;
