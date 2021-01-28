import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Header from "./Components/Header/Header";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <div
      style={{
        width: "100%",
        height: "100%",
        fontFamily: ["Roboto Slab", "serif"].join(","),
      }}
    >
      <Header />
      {/* <App address={"Berlin, 10589, DE"} /> */}
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
