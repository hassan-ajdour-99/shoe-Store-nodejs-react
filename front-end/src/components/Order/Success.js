import React from 'react';
import classes from './success.module.css';

function Success() {
  return (
    <div className={classes.container}>
      <h2> Payment has been done Successfully! </h2>
      <img src='/images/checked.png' alt='checked' />
      <p> We are pending to fullfil your Order soon .</p>
    </div>
  )
}

export default Success;
