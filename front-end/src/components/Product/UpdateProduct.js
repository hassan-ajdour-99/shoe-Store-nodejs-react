import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Loader from "../Layout/loader";
import Message from "../Layout/message";
import {
  productActionDetails,
  updateProductAction,
} from "../Actions/productActions";
import classes from "./UpdateProduct.module.css";
import { PRODUCT_UPDATE_RESET } from "../Constants/productConstant";
import axios from "axios";
import Meta from "../Layout/Meta";

function UpdateProduct() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productDetail = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetail;

  const updateProductState = useSelector((state) => state.updateProduct);
  const {
    loading: loadingUpdate,
    error: ErrorUpdate,
    success: SuccessUpdate,
  } = updateProductState;

  useEffect(() => {
    if (SuccessUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      navigate("/admin/products");
    } else {
      if (!product.name || product._id !== id) {
        dispatch(productActionDetails(id));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setDescription(product.description);
        setCountInStock(product.countInStock);
      }
    }
  }, [SuccessUpdate, dispatch, navigate, product, id]);

  const nameChangeHandler = (event) => {
    event.preventDefault();
    setName(event.target.value);
  };

  const priceChangeHandler = (event) => {
    event.preventDefault();
    setPrice(event.target.value);
  };

  const brandChangeHandler = (event) => {
    event.preventDefault();
    setBrand(event.target.value);
  };

  const categoryChangeHandler = (event) => {
    event.preventDefault();
    setCategory(event.target.value);
  };

  const descriptionChangeHandler = (event) => {
    event.preventDefault();
    setDescription(event.target.value);
  };

  const countInStockChangeHandler = (event) => {
    event.preventDefault();
    setCountInStock(event.target.value);
  };

  const SubmitUpdateProductHandler = (event) => {
    event.preventDefault();
    // Update Product
    dispatch(
      updateProductAction({
        _id: id,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      })
    );
  };

  // Uploading image Function
  const uploadingImageHandler = async (e) => {
    // e.preventDefault();

    const file = e.target.files[0];
    let formData = new FormData();
    formData.append("image", file);

    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const categories = [
    "category",
    "Accessoires",
    "colthes",
    "Others"
  ];

  return (
    <div className={classes.container}>
      <Meta title="Admin | Add New Product" />
      <div className={classes.updateProduct}>
        <h2 className={classes.header}>SHOPPY-Games</h2>
        {loadingUpdate && <Loader />}
        {ErrorUpdate && (
          <Message message={ErrorUpdate} style={{ background: "red" }} />
        )}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message message={error} />
        ) : (
          <form onSubmit={SubmitUpdateProductHandler}>
            <div className={classes.formControl}>
              <label> Name </label>
              <input
                type="name"
                id="name"
                value={name}
                placeholder="name"
                onChange={nameChangeHandler}
              />
            </div>
            <div className={classes.formControl}>
              <label> Price </label>
              <input
                type="number"
                id="price"
                placeholder="price"
                value={price}
                onChange={priceChangeHandler}
              />
            </div>
            <div className={classes.formControl}>
              <label> Image </label>
              <input
                type="text"
                id="image"
                placeholder="Choose Image"
                value={image}
                onChange={(event) => setImage(event.target.value)}
              />
              <input
                type="file"
                id="image-file"
                placeholder="Choose Image"
                onChange={uploadingImageHandler}
              />
              {uploading && <Loader />}
            </div>
            <div className={classes.formControl}>
              <label> Brand </label>
              <input
                type="name"
                id="brand"
                value={brand}
                placeholder="brand"
                onChange={brandChangeHandler}
              />
            </div>
            <div className={classes.formControl}>
              <label> Category </label>
              <select
                type="select"
                defaultValue={category}
                className={classes.selector}
                onChange={categoryChangeHandler}
                required
              >
                {categories.map((cat) => (
                  <option value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className={classes.formControl}>
              <label> Stock </label>
              <input
                type="name"
                id="countInStock"
                value={countInStock}
                placeholder="countInStock"
                onChange={countInStockChangeHandler}
              />
            </div>
            <div className={classes.formControl}>
              <label> Description </label>
              <textarea
                type="name"
                id="description"
                value={description}
                placeholder="description"
                onChange={descriptionChangeHandler}
                className={classes.lastChild}
                required
              ></textarea>
            </div>
            <button className={classes.button}> Update Product </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default UpdateProduct;
