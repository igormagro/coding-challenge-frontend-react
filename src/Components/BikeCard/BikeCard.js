import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./Styles.css";

const BikeCard = (props) => {
  const [date, setDate] = useState([]);
  const [shownDescription, setShownDexcription] = useState("");
  useEffect(() => {
    setDate(
      new Date(props.occurred_at * 1000).toString().split(" ").slice(0, 4)
    );

    if (props.description && props.description.length > 100) {
      const dscpt = [props.description.substring(0, 100), "..."].join("");
      setShownDexcription(dscpt);
    } else {
      setShownDexcription(props.description);
    }
  }, [props]);

  return (
    <div className="cardRoot">
      <div className="card">
        <div className="col">
          <img className="bikeImg" src={props.imgUrl} alt="bike" />
        </div>
        <div className="col text">
          <p>
            <Link
              className="link"
              to={{
                pathname: `/case/${props.id}`,
                state: {
                  date: date.join(" "),
                  address: props.address,
                  title: props.title,
                  description: props.description,
                },
              }}
            >
              {props.title}
            </Link>
          </p>
          <p>{shownDescription}</p>
          <p className="date">
            {date.join(" ")} - {props.address}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BikeCard;
