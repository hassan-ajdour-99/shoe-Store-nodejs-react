import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { topProducts } from "../Actions/productActions";
import { getProductCategory } from "../Actions/productActions";
import Loader from "./loader";
import Message from "./message";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import classes from "./Sliders.css";

function Sliders() {
  const dispatch = useDispatch();

  // const topRatedProducts = useSelector((state) => state.TopRatedProducts);
  // const { loading, error, products: TopProductsItems } = topRatedProducts;

  const productListCategory = useSelector((state) => state.productCategory);
  const { loading, error, products } = productListCategory;

  useEffect(() => {
    // dispatch(topProducts());
    dispatch(getProductCategory());
  }, [dispatch]);

  const settings = {
    dots: false,
    fade: true,
    infinite: true,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
  };

  const sliderImages = [
    "/images/back-09.png",
    "/images/back-07.png",
    "/images/back-08.png",
  ];

  return (
    <div className="content">
      <div className="container">
        <Slider {...settings}>
          {sliderImages.map((product) => (
            <div>
              <div className="images">
                <img src={product} alt="" className="image" />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default Sliders;
