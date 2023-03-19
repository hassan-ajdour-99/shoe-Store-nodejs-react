import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./ProductDetails.module.css";
import { useDispatch, useSelector } from "react-redux";
import Rating from "./Rating/Rating";
import { useParams } from "react-router-dom";
import {
  productActionDetails,
  productCreateReviewAction,
} from "../Actions/productActions";
import Loader from "../Layout/loader";
import Message from "../Layout/message";
import { PRODUCT_RESET_REVIEW } from "../Constants/productConstant";
import ProductCard from "./productCard";
import LandingPage from "../Layout/LandingPage";
import Category from "./Category";
import Meta from "../Layout/Meta";

function ProductDetails() {
  const [qty, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productDetail = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetail;

  console.log(product.reviews.length);

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  const productReview = useSelector((state) => state.createProductReview);
  const {
    loading: loadingReview,
    error: errorReview,
    success: successReview,
  } = productReview;

  useEffect(() => {
    dispatch(productActionDetails(id));
  }, [dispatch, id, successReview]);

  const QuantityChangeHandler = (event) => {
    setQuantity(event.target.value);
  };

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  function reviewSubmitHandler(event) {
    event.preventDefault();
    dispatch(productCreateReviewAction(id, { rating, comment }));
  }

  return loading ? (
    <Loader />
  ) : (
    <div className={classes.container}>
      <Meta title={product.name} description={product.description} />
      <div className={classes.items} key={product._id}>
        <div className={classes.detail}>
          <div className={classes.image}>
            <img src={product.image} alt={product.name} />
          </div>
          <div className={classes.productDetail}>
            <h2 className={classes.title}> {product.name} </h2>
            <div>
              <Rating
                value={product.rating}
                text={`( ${product.numReviews} reviews )`}
                color={classes.color}
              />
            </div>
            <h4> Description : </h4>
            <p>{product.description}</p>
            <p> Brand : {product.brand} </p>
            <h1>
              <span className={classes.titlePrice}>{product.price}dh </span>
            </h1>
            <span className={classes.status}>
              {product.countInStock ? (
                <p> in Stock : {product.countInStock} </p>
              ) : (
                <p> Out of Stock</p>
              )}
            </span>
            {product.countInStock && (
              <div className={classes.quantity}>
                <span> Quantity : </span>
                <select
                  type="select"
                  defaultValue={qty}
                  className={classes.selector}
                  onChange={QuantityChangeHandler}
                >
                  {[...Array(product.countInStock).keys()].map(
                    (numOfQuntitiy) => (
                      <option key={numOfQuntitiy + 1} value={numOfQuntitiy + 1}>
                        {numOfQuntitiy + 1}
                      </option>
                    )
                  )}
                </select>
              </div>
            )}
            {product.countInStock ? (
              <button
                type="button"
                className={classes.button}
                onClick={addToCartHandler}
              >
                + Add to card
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>

      {/* Reviews */}
      {product.reviews.length > 0 && (
        <div>
          <h4 className={classes.bigtitle}> Review & Feedback </h4>
          <div className={classes.reviewSection}>
            {product.reviews.map((review) => (
              <div className={classes.feedback}>
                <h3> {review.name} </h3>
                <span style={{ color: "yellow" }}>
                  <Rating value={product.rating} />
                </span>
                <p>{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Adding reviews */}
      {userInfo && (
        <div>
          {loadingReview ? (
            <Loader />
          ) : errorReview ? (
            <Message message={error} style={{ background: "red" }} />
          ) : (
            <div className={classes.review}>
              <h3 className={classes.bigtitle}> Feedback & Review </h3>
              <form onSubmit={reviewSubmitHandler}>
                <div className={classes.formControl}>
                  <label> Rating </label>
                  <select
                    type="select"
                    value={rating}
                    onChange={(event) => setRating(event.target.value)}
                    className={classes.rating}
                  >
                    <option value=""> Select...</option>
                    <option value="1"> Poor </option>
                    <option value="2"> Average </option>
                    <option value="3"> Not Bad </option>
                    <option value="4"> Good </option>
                    <option value="5"> Outstanding </option>
                  </select>
                </div>
                <div className={classes.formControl}>
                  <label> Feedback </label>
                  <textarea
                    className={classes.inputFeed}
                    type="text"
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                    placeholder="Add New Review"
                  ></textarea>
                </div>
                <button className={classes.submit}>Submit</button>
              </form>
            </div>
          )}
        </div>
      )}
      {/* Displaying Related product */}
      <Category title="Products You May like" category={product.category} />
    </div>
  );
}

export default ProductDetails;

// const [product, setProduct] = useState([]);
// const { id } = useParams();
// const quantity = 1;

// useEffect(() => {
//   const fetchProductById = async () => {
//     const { data } = await axios.get(`/api/product/${id}`);
//     setProduct(data);
//   };
//   fetchProductById();
// }, [id]);
