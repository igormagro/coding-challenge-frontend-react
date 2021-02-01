import React, { Fragment, useEffect, useState } from "react";
import SearchBox from "../Components/SearchBox/SearchBox";
import BikeCard from "../Components/BikeCard/BikeCard";
import axios from "axios";

const axiosOpt = {
  url: "https://bikewise.org/api/v2/incidents?proximity=Berlin",
  method: "GET",
};

const Index = () => {
  const [incidents, setIncidents] = useState([]);
  const [displayedIncidents, setDisplayedIncidents] = useState([]);
  const [searchParams, setSearchParams] = useState({
    caseDescription: "",
    fromDate: "",
    toDate: "",
  });
  useEffect(() => {
    axios
      .request(axiosOpt)
      .then((res) => {
        setIncidents(res.data.incidents);
        setDisplayedIncidents(res.data.incidents);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const iptChangeHandler = (event) => {
    const { name, value } = event.target;
    let strToDate = null;
    if (name.split("Date").length > 1) {
      strToDate = new Date(value).getTime() / 1000;
      console.log(strToDate);
    } else {
      strToDate = value;
    }
    setSearchParams((prevVal) => {
      return {
        ...prevVal,
        [name]: strToDate,
      };
    });
  };

  const searchClickHandler = (e) => {
    e.preventDefault();
    const { caseDescription, toDate, fromDate } = searchParams;
    const newDisplayed = incidents.filter((el) => {
      let { description, occurred_at } = el;
      const conditions = [];
      let dscrptn = "";
      if (description) {
        dscrptn = description;
      }
      conditions.push("dscrptn.includes(caseDescription)");
      if (fromDate) {
        conditions.push("occurred_at >= fromDate");
      }
      if (toDate) {
        conditions.push("occurred_at <= toDate");
      }
      console.log(conditions.join("&&"));
      return false || eval(conditions.join("&&"));
    });
    setDisplayedIncidents(newDisplayed);
  };

  const displayed = displayedIncidents.filter((el, idx) => {
    return idx <= 9;
  });

  return (
    <Fragment>
      <SearchBox
        total={displayedIncidents.length}
        clicked={searchClickHandler}
        changed={iptChangeHandler}
      />
      {displayed.map((el) => {
        return (
          <BikeCard
            key={el.id}
            title={el.title}
            description={el.description}
            address={el.address}
            occurred_at={el.occurred_at}
            imgUrl={el.media.image_url}
          />
        );
      })}
    </Fragment>
  );
};

export default Index;
