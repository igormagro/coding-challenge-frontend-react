import React from "react";

const Map = (props) => {
  return (
    // Important! Always set the container height explicitly
    <iframe
      title="map"
      width="100%"
      height="400"
      frameBorder="0"
      style={{ border: 0, margin: "20px 0" }}
      src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDvtYAadFEWgb03cuGmkxqw7jinFe8edSk&q=${props.address}`}
    ></iframe>
  );
};

export default Map;
