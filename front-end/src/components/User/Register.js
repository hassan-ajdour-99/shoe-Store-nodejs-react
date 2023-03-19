import { useState, useEffect } from "react";
import classes from "./Register.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { userRegisterAction } from "../Actions/userActions";
import Loader from "../Layout/loader";
import Message from "../Layout/message";
import Meta from "../Layout/Meta";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);

  const { loading, error, userInfo } = userRegister;

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

  // useEffect(() => {

  // },[])

  const submitFormHandler = (event) => {
    event.preventDefault();

    if (!email.includes("@")) {
      setMessage("email not Found, exmaple@email.com");
      return;
    }

    if (
      name.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      confirmPassword.trim() === ""
    ) {
      setMessage("Please this form to register");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Password do not Match");
      return;
    } else {
      dispatch(userRegisterAction(name, email, password));
      // Save New User && Naviage to User profile
      navigate("/profile");
    }
  };

  return (
    <div className={classes.container}>
      <Meta title="Shoppy-Games | Register" />
      <div className={classes.login}>
        <h2 className={classes.logo}>
          <img src="/images/logo.png" alt="" />
        </h2>
        {message && <Message message={message} />}
        {error && <Message message="Fill the Form to Register" />}
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
              placeholder="Password"
              onChange={passwordChangeHandler}
            />
          </div>
          <div className={classes.formControl}>
            <label> Confirm Password </label>
            <input
              type="name"
              id="password"
              value={confirmPassword}
              placeholder="Password"
              onChange={confirmPasswordChangeHandler}
            />
          </div>
          <button className={classes.button}> Register </button>
          <h3>
            You have already premierean Account ?
            <span className={classes.signup}>
              <Link to="/login"> Login </Link>
            </span>
          </h3>
        </form>
      </div>
    </div>
  );
}

export default Register;
