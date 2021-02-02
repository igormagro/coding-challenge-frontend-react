import React, { useEffect, useState } from "react";
import Map from "../Components/Map/Map";

const Description = (props) => {
  const [detailedData, setDetailedData] = useState({
    date: "",
    address: "",
    title: "",
    description: "",
  });

  useEffect(() => {
    const { state } = props.location;
    setDetailedData({ ...state });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>{detailedData.title}</h2>
      <p>{`Stolen ${detailedData.date} at ${detailedData.address}`}</p>
      <Map address={detailedData.address} />
      <h1>DESCRIPTION OF INCIDENT</h1>
      <p>{detailedData.description}</p>
    </div>
  );
};

export default Description;
