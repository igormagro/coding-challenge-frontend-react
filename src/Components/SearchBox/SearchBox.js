import React from "react";
import "./Styles.css";

const SearchBox = (props) => {
  return (
    <div className="box">
      <form>
        <input
          name="caseDescription"
          className="ipt_description"
          placeHolder="Search case descriptions"
          type="text"
          onChange={props.changed}
        />
        <div className="box__date">
          <p>from</p>
          <input name="fromDate" type="date" onChange={props.changed} />
        </div>
        <div className="box__date">
          <p>to</p>
          <input name="toDate" type="date" onChange={props.changed} />
        </div>
        <button onClick={props.clicked} className="btn">
          Find cases
        </button>
      </form>
      <p className="box__p">total: {props.total}</p>
    </div>
  );
};

export default SearchBox;
