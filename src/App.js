import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";

import Header from "./Components/Header/Header";
import Index from "./Pages/Index";
import Details from "./Pages/Details";

const App = () => {
  return (
    <Fragment>
      <Header />
      <Switch>
        <Route path="/case" component={Details} />
        <Route path="/" component={Index} />
      </Switch>
    </Fragment>
  );
};

export default App;
