import React from "react";
import { Link } from "react-router-dom";
import pdLogo from "../../Berlin-PD.png";
import "./Styles.css";

const Header = () => {
  return (
    <div className="root">
      <img src={pdLogo} className="logo" alt="Berlin PD Logo" />
      <Link to="/" className="title_box">
        <div>
          <h1>Police Department of Berlin</h1>
          <p>Stolen Bykes</p>
        </div>
      </Link>
    </div>
  );
};

export default Header;
