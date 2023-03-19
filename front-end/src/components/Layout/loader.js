import React from "react";
import classes from "./loader.module.css";

function Loader() {
  return (
    <div className={classes.container}>
      <div className={classes.loader}></div>
    </div>
  );
}

export default Loader;
