import React from "react";
import classes from "./Rating.module.css";

const Rating = ({ value, text, color }) => {
  return (
    <div className={classes.rating}>
      <span
        style={{ color }}
        className={
          value >= 1
            ? "fas fa-star"
            : value >= 0.5
            ? "fas fa-star-half-alt"
            : "fas fa-star"
        }
      ></span>
      <span
        style={{ color }}
        className={
          value >= 2
            ? "fas fa-star"
            : value >= 1.5
            ? "fas fa-star-half-alt"
            : "fas fa-star"
        }
      ></span>
      <span
        style={{ color }}
        className={
          value >= 3
            ? "fas fa-star"
            : value >= 2.5
            ? "fas fa-star-half-alt"
            : "fas fa-star"
        }
      ></span>
      <span
        style={{ color }}
        className={
          value >= 4
            ? "fas fa-star"
            : value >= 3.5
            ? "fas fa-star-half-alt"
            : "fas fa-start"
        }
      ></span>
      <span
        style={{ color }}
        className={
          value >= 5
            ? "fas fa-star"
            : value >= 4.5
            ? "fas fa-star-half-alt"
            : "fas fa-start"
        }
      ></span>

      <span>{text && text}</span>
    </div>
  );
};

export default Rating;

//  <i class="fa-solid fa-star"></i>
//  <i class="fa-solid fa-star-half-stroke"></i>
