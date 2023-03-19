import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import classes from "./Login.module.css";
import { userLoginAction } from "../Actions/userActions";
import Loader from "../Layout/loader";
import Message from "../Layout/message";
import Meta from "../Layout/Meta";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const redirect = location.search
  //   ? Number(location.search.split("=")[1])
  //   : "/";

  const userLogin = useSelector((state) => state.userLogin);

  const { loading, error, userInfo } = userLogin;

  const emailChangeHandler = (event) => {
    event.preventDefault();
    setEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    event.preventDefault();
    setPassword(event.target.value);
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  const submitFormHandler = (event) => {
    event.preventDefault();

    if (email.trim() === "" || !email.includes("@") || password.trim() === "") {
      setErrorMessage("Email or Password is invalid");
      return;
    }

    // DISPACTH LOGIN
    dispatch(userLoginAction(email, password));
    if (userInfo) {
      navigate("/");
    }
  };

  return (
    <div className={classes.container}>
      <Meta title="Shoppy-Games | Login" />
      <div className={classes.login}>
        <h2 className={classes.logo}>
          <img src="/images/logo.png" alt="" />
        </h2>
        {errorMessage && <Message message={errorMessage} />}
        {error && <Message message={error} />}
        {loading && <Loader />}
        <form onSubmit={submitFormHandler}>
          <div className={classes.formControl}>
            <label> Username </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={emailChangeHandler}
              placeholder="Username"
            />
          </div>
          <div className={classes.formControl}>
            <label> Password </label>
            <input
              type="password"
              id="password"
              value={password}
              placeholder="Password"
              onChange={passwordChangeHandler}
            />
          </div>
          <button className={classes.button}> Login </button>
          <h3>
            You don't have an Account ?
            <span className={classes.signup}>
              <Link to="/register"> Register </Link>
            </span>
          </h3>
        </form>
      </div>
    </div>
  );
}

export default Login;
