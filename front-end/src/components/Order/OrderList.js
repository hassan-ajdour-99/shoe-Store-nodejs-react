import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom";
import Loader from "../Layout/loader";
import Message from "../Layout/message";
import classes from "./OrderList.module.css";
import { getOrdersListAction, deleteOrderAction,  orderDeliveryAction } from "../Actions/orderAction";
import Meta from "../Layout/Meta";

function OrderList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orderList = useSelector((state) => state.allOrderList);
  const { loading, error, orders } = orderList;
  // const orderLenght = orders.length;

  const orderToDelete = useSelector((state) => state.deleteOrderState);
  const {
    loading: LoadingDeleteOrder,
    success: successDeleteOrder,
    error: errorDeleteOrder,
  } = orderToDelete;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderDetail = useSelector((state) => state.orderDetails);
  const { loading: orderLoading,  order } = orderDetail;

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate("/login");
    } else {
      dispatch(getOrdersListAction());
    }
    if (successDeleteOrder) {
      navigate("/admin/orders");
    }
  }, [dispatch, navigate, successDeleteOrder, userInfo]);

  // Delete Order Action
  function DeleteOrderHandler(id) {
    if (window.confirm("Are you sure you want to delete this ORDER ?")) {
      dispatch(deleteOrderAction(id));
    }
  }

  // Order deliver successfully .
  const orderIsDeliveredSuccessfuly = () => {
    dispatch(orderDeliveryAction(order));
    console.log('order delivered successfully');
  }

  return (
    <div className={classes.container}>
      {LoadingDeleteOrder ? (
        <Loader />
      ) : (
        LoadingDeleteOrder && <Message message={LoadingDeleteOrder} />
      )}
      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <Message message={error} style={{ background: "red" }}></Message>
      ) : (
        <table className={classes.table}>
          <Meta title="Admin | Orders Dashboard " />
          <thead>
            <tr>
              <th> Order ID </th>
              <th> Username </th>
              <th> Created At </th>
              <th> Total Price </th>
              <th> Paid </th>
              <th> Delivered </th>
              <th> Details </th>
              <th> Delete </th>
            </tr>
          </thead>
          {orders.map((order) => (
            <tbody key={order._id}>
              <tr>
                <td>{order._id}</td>
                <td>{order.username}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    order.PaidAt
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    order.deliveryAt
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <Link to={`/orders/${order._id}`}>
                    <button className={classes.button1}> Show </button>
                  </Link>
                </td>
                <td>
                  <button
                    className={classes.button2}
                    onClick={() => DeleteOrderHandler(order._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      )}
    </div>
  );
}

export default OrderList;
