import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
// import products from "../../products";
import Product from "./Product";
import classes from "./Products.module.css";
import { listProducts } from "../Actions/productActions";
import Loader from "../Layout/loader";
import Message from "../Layout/message";
import Pagination from "../Layout/Pagination";
import Sliders from "../Layout/Sliders";
import ProductCard from "./productCard";
import LandingPage from "../Layout/LandingPage";
import LandingPage2 from "../Layout/LandingPage2";
import Delivery from "../Layout/Delivery";
import Category from "./Category";
import Services from "../Layout/Services";
import FilterProduct from "./FilterProduct";
import FlashCard from "./FlashCard";
import Meta from "../Layout/Meta";

function Products() {
  const dispatch = useDispatch();

  const { keyword } = useParams();

  const params = useParams();
  const pageNumber = params.pageNumber || 1;

  console.log(pageNumber);

  console.log(keyword);

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pages, page } = productList;

  // FAIRING THE Action STATE
  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <div>
      <Meta title="Welcome to shoppy-games | Home" />
      {/* {!keyword && <Sliders />} */}
      {!keyword && <LandingPage></LandingPage>}
      <div className={classes.container}>
        {keyword && (
          <div className={classes.header1}>
            <h3> Search Results : </h3>
            <h3>
              {"Are you looking for!"}
              <span className={classes.keyword}>{`${keyword}`} </span>
            </h3>
          </div>
        )}
        {!keyword && (
          <FilterProduct title="Featured Products" category="Accessoires" />
        )} 
      {!keyword && <h2 className={classes.header}> All Products </h2> }
        {loading ? (
          <Loader />
        ) : error ? (
          <Message message={error} />
        ) : (
          <div className={classes.cards}>
            {products.map((pro) => (
              <div key={pro._id}>
                <Product product={pro} />
              </div>
            ))}
          </div>
        )}
        <Pagination
          pages={pages}
          page={page}
          keyword={keyword ? keyword : ""}
        />
      {!keyword && <Delivery></Delivery>}
      {!keyword && (
          <FlashCard title="Accessoires Products" cat="Accessoires" />
        )} 
      </div>
    </div>
  );
}

export default Products;

// useEffect(() => {
//   const fetchProduct = async () => {
//     const response = await axios.get("/api/products");
//     setProducts(response.data);
//   };
//   fetchProduct();
// }, []);
