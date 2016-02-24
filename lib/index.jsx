import React from "react"
import ReactDOM from "react-dom"
import { Router, Redirect, Route, Link, browserHistory } from 'react-router'
import Root from "./components/Root.jsx"
import Packages from "./components/PackagesList.jsx"
ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/ui" component={Root}>
      <Route path="/ui/repos/:name" component={Packages}/>
    </Route>
    <Redirect from="/" to="/ui" />
  </Router>
  , document.getElementById("container")
);
