import React from "react"
import ReactDOM from "react-dom"
import { Router, Redirect, Route, Link, browserHistory } from 'react-router'
import Root from "./components/Root.jsx"
import Repos from "./components/Repos.jsx"
ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/ui" component={Root}>
      <Route path="/ui/repos/:name" component={Repos}/>
    </Route>
    <Redirect from="/" to="/ui" />
  </Router>
  , document.getElementById("container")
);
