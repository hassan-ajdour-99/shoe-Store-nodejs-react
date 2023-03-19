import { useState, useEffect } from "react";
import classes from "./Profile.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  userDetailsAction,
  userUpdateProfileAction,
} from "../Actions/userActions";
import Loader from "../Layout/loader";
import Message from "../Layout/message";
import { Link } from "react-router-dom";
import { getAllOrdersAction } from "../Actions/orderAction";
import Meta from "../Layout/Meta";

function Profile() {
  const [message, setMessage] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user.name) {
        dispatch(userDetailsAction("profile"));
        // Get & dispatch all orders
        dispatch(getAllOrdersAction());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, navigate, user, userInfo]);

  // Order Details
  const userOrderInfo = useSelector((state) => state.userOrders);

  const {
    loading: LoadingOrder,
    error: ErrorOrder,
    order: orders,
  } = userOrderInfo;

  return (
    <div className={classes.container}>
      <Meta title="shoppy-Games | Profile" />
      <div className={classes.content}>
        <div className={classes.card}>
          <h1> MY Profile </h1>
          <h2> {user.name} </h2>
          <h2> {user.email} </h2>
          <p className={classes.lin}>
            <Link to="/change-password" className={classes.link}>
              Change Password
            </Link>
          </p>
        </div>
        <div className={classes.orders}>
          <h1> MY Orders </h1>
          {orders ? (
            <div className={classes.order}>
              {LoadingOrder ? (
                <Loader />
              ) : ErrorOrder ? (
                <Message message={ErrorOrder} />
              ) : (
                <table className={classes.table}>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>DATE</th>
                      <th>PAID </th>
                      <th>DELIVERED</th>
                      <th> SHOW </th>
                    </tr>
                  </thead>
                  {orders.map((order) => (
                    <tbody key={order._id}>
                      <tr>
                        <td> {order._id.substring(1, 8)} </td>
                        <td> {order.createdAt} </td>
                        <td>
                          {order.isPaid ? (
                            order.PaidAt.substring(0, 10)
                          ) : (
                            <i
                              className="fas fa-times"
                              style={{ color: "red" }}
                            ></i>
                          )}
                        </td>
                        <td>
                          {order.isDelivered ? (
                            order.isDeliveryAt
                          ) : (
                            <i
                              className="fas fa-times"
                              style={{ color: "red", size: 30 }}
                            ></i>
                          )}
                        </td>
                        <td>
                          <Link to={`/orders/${order._id}`}>
                            <button className={classes.orderButton}>
                              Details
                            </button>
                          </Link>
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </table>
              )}
            </div>
          ) : (
            <h1 className={classes.NoOrders}> No Order Yet! </h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;

// <table className={classes.table}>
// <thead>
//   <tr>
//     <th>ID</th>
//     <th>DATE</th>
//     <th>TOTAL</th>
//     <th>PAID </th>
//     <th>DELIVERED</th>
//     <th>SHOW</th>
//   </tr>
// </thead>
// <tbody>
//   <tr>
//     <td> 784444449A0NFBFBFEB </td>
//     <td> 12-09-2022 </td>
//     <td> 78799$ </td>
//     <td> NOT PAID </td>
//     <td> NOT DELIVERED </td>
//     <td> NOT SHOWED </td>
//   </tr>
// </tbody>
// <tbody>
//   <tr>
//     <td> 784444449A0NFBFBFEB </td>
//     <td> 12-09-2022 </td>
//     <td> 78799$ </td>
//     <td> NOT PAID </td>
//     <td> NOT DELIVERED </td>
//     <td> NOT SHOWED </td>
//   </tr>
// </tbody>
// </table>
