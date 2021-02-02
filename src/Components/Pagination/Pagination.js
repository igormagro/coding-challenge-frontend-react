import React, { useEffect, useState } from "react";

import "./Styles.css";

const Pagination = (props) => {
  const [pages, setPages] = useState([]);
  useEffect(() => {
    console.log("[Pagination.js] useEffect (componentDidUpdate)");
    const auxPages = [];
    for (let i = 0; i < props.numberOfPages; i++) {
      auxPages.push(i + 1);
    }
    setPages(auxPages);
  }, [props.numberOfPages]);

  return (
    <div className="page_box">
      <button
        onClick={props.clicked}
        name="first"
        disabled={props.page === pages[0]}
      >
        {"<< First"}
      </button>
      <button
        onClick={props.clicked}
        name="prev"
        disabled={!pages[props.page - 2]}
      >
        {"< Prev"}
      </button>
      {pages &&
        pages
          .filter((el) => {
            let next = props.page;
            let prev = props.page - 2;
            //console.log(`prev: ${pages[prev]}`, `next: ${pages[next]}`);
            if (!pages[next]) {
              next = props.page;
              prev = props.page - 2;
            } else {
              if (!pages[prev]) {
                prev = props.page;
                next = props.page + 2;
              } else {
                next = props.page + 1;
                prev = props.page - 1;
              }
            }
            return (el - prev) * (el - next) <= 0;
          })
          .map((el, idx) => {
            return (
              <button
                key={idx}
                className={el === props.page ? "active" : undefined}
                onClick={props.clicked}
                name={el}
              >
                {el}
              </button>
            );
          })}
      <button onClick={props.clicked} name="next" disabled={!pages[props.page]}>
        {"Next >"}
      </button>
      <button
        onClick={props.clicked}
        name="last"
        disabled={props.page === pages.length}
      >
        {"Last >>"}
      </button>
    </div>
  );
};

export default Pagination;
