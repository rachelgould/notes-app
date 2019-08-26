import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";

export default () =>
  // Switch renders the first matching route that is defined within it
  // The `exact` prop makes sure that the URL matches '/' exactly
  <Switch>
    <Route path="/" exact component={Home} />
  </Switch>;