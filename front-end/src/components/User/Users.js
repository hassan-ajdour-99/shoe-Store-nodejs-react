import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { getAllUsersAction, userDeleteAction } from "../Actions/userActions";
import Loader from "../Layout/loader";
import Message from "../Layout/message";
import classes from "./Users.module.css";
import Meta from "../Layout/Meta";

function Users() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userList = useSelector((state) => state.allUsers);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getAllUsersAction());
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, userInfo]);

  function userDeleteHandler(id) {
    if (window.confirm("Are you sure you want to delete user?")) {
      dispatch(userDeleteAction(id));
    }
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message message={error} style={{ background: "red" }} />
  ) : (
    <div className={classes.container}>
      <Meta title=" Admin | Users Dashboard" />
      <h3 className={classes.users}> All USERS </h3>
      <table className={classes.table}>
        <thead>
          <tr>
            <th> ID </th>
            <th> NAME </th>
            <th> EMAIL </th>
            <th> ADMIN </th>
            <th> REMOVE </th>
          </tr>
        </thead>
        {users.map((user) => (
          <tbody key={user._id}>
            <tr>
              <td> {user._id} </td>
              <td> {user.name} </td>
              <td> {user.email} </td>
              <td>
                {user.isAdmin ? (
                  <i className="fa fa-check" style={{ color: "green" }}></i>
                ) : (
                  <i className="fa fa-times" style={{ color: "red" }}></i>
                )}
              </td>
              <td>
                <button
                  className={classes.button2}
                  onClick={() => userDeleteHandler(user._id)}
                >
                  delete
                </button>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
      <br></br>
    </div>
  );
}

export default Users;
