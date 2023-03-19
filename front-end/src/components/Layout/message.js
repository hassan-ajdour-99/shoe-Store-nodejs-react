import React from "react";
import classes from "./message.module.css";

function Message(props) {
  return (
    <div className={classes.container}>
      <div className={classes.message} style={props.style}>
        {props.message}
      </div>
    </div>
  );
}

export default Message;
