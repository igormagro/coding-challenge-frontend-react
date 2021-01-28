import React from "react";
import pdLogo from "../../Berlin-PD.png";
import "./Styles.css";

const Header = () => {
  return (
    <div className="root">
      <img src={pdLogo} className="logo" alt="Berlin PD Logo" />
      <div className="title_box">
      <h1>Police Department of Berlin</h1>
      <p>Stolen Bykes</p>
      </div>
      
    </div>
  );
};

export default Header;
