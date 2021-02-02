import React, { Fragment, useEffect, useState } from "react";
import SearchBox from "../Components/SearchBox/SearchBox";
import BikeCard from "../Components/BikeCard/BikeCard";
import Pagination from "../Components/Pagination/Pagination";
import axios from "axios";

const axiosOpt = {
  url: "https://bikewise.org/api/v2/incidents?per_page=100&proximity=Berlin",
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
  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 10,
    numberOfPages: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    axios
      .request(axiosOpt)
      .then((res) => {
        setIncidents(res.data.incidents);
        setDisplayedIncidents(res.data.incidents);
        setPagination((prev) => {
          return {
            ...prev,
            numberOfPages: Math.ceil(res.data.incidents.length / 10),
          };
        });
        setIsLoading(false);
      })
      .catch((err) => {
        setError(true);
      });
  }, []);

  const iptChangeHandler = (event) => {
    const { name, value } = event.target;
    let strToDate = null;
    if (name.split("Date").length > 1) {
      strToDate = new Date(value).getTime() / 1000;
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
      return false || eval(conditions.join("&&"));
    });
    setDisplayedIncidents(newDisplayed);
    setPagination((prev) => {
      return { ...prev, numberOfPages: newDisplayed.length / 10 };
    });
  };

  const changePageClickHandler = (e) => {
    const { name } = e.target;
    console.log(name);
    switch (name) {
      case "prev":
        setPagination((prev) => {
          return {
            ...prev,
            currentPage: prev.currentPage - 1,
          };
        });
        break;
      case "next":
        setPagination((prev) => {
          return {
            ...prev,
            currentPage: prev.currentPage + 1,
          };
        });
        break;
      case "first":
        setPagination((prev) => {
          return {
            ...prev,
            currentPage: 1,
          };
        });
        break;
      case "last":
        setPagination((prev) => {
          return {
            ...prev,
            currentPage: prev.numberOfPages,
          };
        });
        break;

      default:
        setPagination((prev) => {
          return {
            ...prev,
            currentPage: +name,
          };
        });
        break;
    }
  };

  const displayed = displayedIncidents
    .filter((el, idx) => {
      return (
        (idx - pagination.itemsPerPage * (pagination.currentPage - 1) + 1) *
          (idx - pagination.itemsPerPage * pagination.currentPage) <
        0
      );
    })
    .sort((a, b) => {
      if (a.occurred_at > b.occurred_at) {
        return -1;
      }
      if (a.occurred_at > b.occurred_at) {
        return 1;
      }
      return 0;
    });

  return (
    <Fragment>
      <SearchBox
        total={displayedIncidents.length}
        clicked={searchClickHandler}
        changed={iptChangeHandler}
      />
      {error ? (
        <p style={{ padding: "20px", color: "red" }}>
          Ooops, something went wrong
        </p>
      ) : displayed.length === 0 ? (
        <p style={{ padding: "20px" }}>
          {isLoading ? "Loading..." : "No results"}
        </p>
      ) : (
        <Fragment>
          {displayed.map((el) => {
            return (
              <BikeCard
                id={el.id}
                key={el.id}
                title={el.title}
                description={el.description}
                address={el.address}
                occurred_at={el.occurred_at}
                imgUrl={el.media.image_url}
              />
            );
          })}
          <Pagination
            page={pagination.currentPage}
            clicked={changePageClickHandler}
            numberOfPages={pagination.numberOfPages}
          />
        </Fragment>
      )}
    </Fragment>
  );
};

export default Index;
