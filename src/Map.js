import React, { Component } from "react";

import logo from "./Berlin-PD.png";

const SimpleMap = (props) => {
  return (
    // Important! Always set the container height explicitly
    <div>
      <iframe
        title="map"
        width="600"
        height="450"
        frameBorder="0"
        style={{ border: 0 }}
        src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDvtYAadFEWgb03cuGmkxqw7jinFe8edSk&q=${props.address}`}
      ></iframe>
      <img
        src="https://files.bikeindex.org/uploads/Pu/344761/large_hofschen-bike_1.png"
        alt="bike-img"
      />
      <img src={logo} alt="teste" />
    </div>
  );
};

export default SimpleMap;
