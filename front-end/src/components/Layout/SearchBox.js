import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./SearchBox.module.css";

function SearchBox() {
  const [keyword, setKeyword] = useState("");

  const navigate = useNavigate();

  function submitFormHandler(event) {
    event.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
    }
  }

  return (
    <div className={classes.container}>
      <form onSubmit={submitFormHandler}>
        <div className={classes.formControl}>
          <input
            type="text"
            name="q"
            placeholder="Search"
            onChange={(event) => setKeyword(event.target.value)}
          />
        </div>
        <button type="submit" className={classes.btn}>
          <span style={{ color: "white" }}>
            <i class="fas fa-solid fa-search"></i>
          </span>
        </button>
      </form>
    </div>
  );
}

export default SearchBox;
