import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Loader from "../Layout/loader";
import Message from "../Layout/message";
import {
  listProducts,
  deleteProductAction,
  createNewProductAction,
} from "../Actions/productActions";
import classes from "./ProductList.module.css";
import { PRODUCT_CREATE_RESET } from "../Constants/productConstant";
import Pagination from "../Layout/Pagination";
import Meta from "../Layout/Meta";

function ProductsList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const params = useParams();
  const pageNumber = params.pageNumber || 1;

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productDeleteItem = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: ErrorDelete,
    success: SuccessDelete,
  } = productDeleteItem;

  const createProductState = useSelector((state) => state.createdNewProduct);

  const {
    loading: loadingCreate,
    success: successCreate,
    error: ErrorCreate,
    product: createdProduct,
  } = createProductState;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });

    if (!userInfo.isAdmin) {
      navigate("/login");
    }

    if (successCreate) {
      const NewCreatedProductId = createdProduct._id;
      navigate(`/admin/products/${NewCreatedProductId}/edit`);
    } else {
      dispatch(listProducts("", pageNumber));
    }

    dispatch(listProducts("", pageNumber));
  }, [
    dispatch,
    navigate,
    userInfo,
    SuccessDelete,
    successCreate,
    createdProduct,
    pageNumber,
  ]);

  function DeleteProductHandler(id) {
    if (window.confirm("Are you sure you want to delete this Product ?")) {
      dispatch(deleteProductAction(id));
    }
  }

  function AddNewProductHandler() {
    dispatch(createNewProductAction());
  }

  return (
    <div className={classes.container}>
      <Meta title="Admin | Products Dashboard" />
      <div className={classes.adminProduct}>
        <button
          className={classes.newProductButton}
          onClick={AddNewProductHandler}
        >
          +Add New Product
        </button>
      </div>
      {loadingCreate && <Loader />}
      {ErrorCreate && (
        <Message message={ErrorCreate} style={{ background: "red" }} />
      )}
      {loadingDelete && <Loader />}
      {ErrorDelete && (
        <Message message={ErrorDelete} style={{ background: "red" }} />
      )}
      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <Message message={error} style={{ background: "red" }}></Message>
      ) : (
        <table className={classes.table}>
          <thead>
            <tr>
              <th> Product Name </th>
              <th> Product Id </th>
              <th> Price </th>
              <th> Brand </th>
              <th> Category </th>
              <th> Stock </th>
              <th> Edit </th>
              <th> Delete </th>
            </tr>
          </thead>
          {products?.map((product) => (
            <tbody key={product._id}>
              <tr>
                <td> {product.name} </td>
                <td> {product._id} </td>
                <td> {product.price} </td>
                <td> {product.brand} </td>
                <td> {product.category} </td>
                <td> {product.countInStock} </td>
                <td>
                  <Link to={`/admin/products/${product._id}/edit`}>
                    <button className={classes.button1}> Edit </button>
                  </Link>
                </td>
                <td>
                  <button
                    className={classes.button2}
                    onClick={() => DeleteProductHandler(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      )}
      <Pagination page={page} pages={pages} isAdmin={true} />
    </div>
  );
}

export default ProductsList;
