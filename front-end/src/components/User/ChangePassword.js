import { useState, useEffect } from "react";
import classes from "./ChangePassword.module.css";
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

function ChangePassword() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const nameChangeHandler = (event) => {
    event.preventDefault();
    setName(event.target.value);
  };

  const emailChangeHandler = (event) => {
    event.preventDefault();
    setEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    event.preventDefault();
    setPassword(event.target.value);
  };

  const confirmPasswordChangeHandler = (event) => {
    event.preventDefault();
    setConfirmPassword(event.target.value);
  };

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
  }, [userInfo, navigate, dispatch, user]);

  const submitFormHandler = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password do not Match");
      return;
    } else {
      // DISPATCH UPDATE USER PROFILE
      dispatch(
        userUpdateProfileAction({
          id: user._id,
          name,
          email,
          password,
        })
      );
      console.log("user Profile update successful");
    }
  };

  const userOrderInfo = useSelector((state) => state.userOrders);

  const {
    loading: LoadingOrder,
    error: ErrorOrder,
    order: orders,
  } = userOrderInfo;

  return (
    <div className={classes.container}>
      <Meta title="Shoppy-Games | Profile" />
      <div className={classes.cards}>
        <div className={classes.profile}>
          <h2 className={classes.logo}>
            <img src="/images/logo.png" alt="" />
          </h2>
          {message && <Message message={error} />}
          {error && <Message message={error} />}
          {success && (
            <Message message="Profile Update" style={{ background: "green" }} />
          )}
          {loading && <Loader />}
          <form onSubmit={submitFormHandler}>
            <div className={classes.formControl}>
              <label> Username </label>
              <input
                type="name"
                id="username"
                value={name}
                placeholder="Username"
                onChange={nameChangeHandler}
              />
            </div>
            <div className={classes.formControl}>
              <label> Email </label>
              <input
                type="email"
                id="email"
                placeholder="email"
                value={email}
                onChange={emailChangeHandler}
              />
            </div>
            <div className={classes.formControl}>
              <label> Password </label>
              <input
                type="name"
                id="password"
                value={password}
                placeholder="Update Password"
                onChange={passwordChangeHandler}
              />
            </div>
            <div className={classes.formControl}>
              <label> Confirm Password </label>
              <input
                type="name"
                id="password"
                value={confirmPassword}
                placeholder="New Password"
                onChange={confirmPasswordChangeHandler}
              />
            </div>
            <button className={classes.button}> Update profile </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
