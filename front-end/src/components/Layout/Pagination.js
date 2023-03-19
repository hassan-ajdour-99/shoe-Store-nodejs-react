import React from "react";
import classes from "./Pagination.module.css";
import { Link, Router, Route, Routes } from "react-router-dom";

function Pagination({ page, pages, isAdmin = false, keyword = "" }) {
  return (
    pages > 1 && (
      <div className={classes.container}>
        <div className={classes.pagination}>
          <p>&laquo;</p>
          {[...Array(pages).keys()].map((p) => (
            <Link
              key={p + 1}
              to={
                !isAdmin
                  ? keyword
                    ? `/search/${keyword}/page/${p + 1}`
                    : `/page/${p + 1}`
                  : `/admin/products/${p + 1}`
              }
            >
              <p className={p + 1 === page && classes.active}>{p + 1}</p>
            </Link>
          ))}
          <p>&raquo;</p>
        </div>
      </div>
    )
  );
}

export default Pagination;
