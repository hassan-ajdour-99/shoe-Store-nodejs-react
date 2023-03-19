import React, { useEffect } from "react";
import classes from "./Services.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProductCategory } from "../Actions/productActions";
import Loader from "../Layout/loader";
import Message from "../Layout/message";

function Services() {
  const dispatch = useDispatch();

  const productListCategory = useSelector((state) => state.productCategory);
  const { loading, error, products } = productListCategory;

  useEffect(() => {
    dispatch(getProductCategory());
  }, [dispatch]);

  function AccessoriesProduct(category) {
    const filterByAccessories = products.filter(
      (product) => product.category === category
    );
    // return filterByAccessories.slice(0, 8);
    return filterByAccessories.slice(0, 6);
  }

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 3000,
    cssEase: "linear",
  };

  return (
    <div
      className={classes.container}
      style={{ backgroundImage: "/images/cover.png" }}
    >
      <Slider {...settings}>
        {AccessoriesProduct("Headphones").map((pro) => (
          <div key={pro._id} className={classes.card}>
            <Link to={`/product/${pro._id}`} className={classes.link}>
              <img src={pro.image} alt="" />
            </Link>
            <h3 className={classes.name}> {pro.price}dh </h3>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Services;
