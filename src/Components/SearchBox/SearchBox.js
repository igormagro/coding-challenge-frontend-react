import React from "react";
import "./Styles.css";

const SearchBox = (props) => {
  const searchClickHandler = (e) => {
    e.preventDefault();
  };
  return (
    <div className="box">
      <form>
        <input
          className="ipt_description"
          placeHolder="Search case descriptions"
          type="text"
        />
        <div className="box__date">
          <p>from</p>
          <input type="date" />
        </div>
        <div className="box__date">
          <p>to</p>
          <input type="date" />
        </div>
        <button onClick={searchClickHandler} className="btn">
          Find cases
        </button>
      </form>
      <p className="box__p">total: {props.total}</p>
    </div>
  );
};

export default SearchBox;
