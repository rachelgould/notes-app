import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from './containers/NotFound';
import Login from './containers/Login';

export default () =>
  // Switch renders the first matching route that is defined within it
  // The `exact` prop makes sure that the URL matches '/' exactly
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path='/login' exact component={Login} />
    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;