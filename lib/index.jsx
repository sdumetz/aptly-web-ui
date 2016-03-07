import React from "react"
import ReactDOM from "react-dom"
import { Router, Redirect, Route, Link, browserHistory } from 'react-router'
import Root from "./components/Root.jsx"
import RepoView from "./components/RepoView.jsx"
import PackageInfos from "./components/PackageInfos.jsx"
import MigrateView from "./components/MigrateView.jsx"
ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/ui" component={Root}>
      <Route path="/ui/repos/:repo" component={RepoView}>
        <Route path="/ui/repos/:repo/packages/:name" component={PackageInfos}/>
      </Route>
      <Route path="/ui/migrate/:key" component={MigrateView}/>
    </Route>
    <Redirect from="/" to="/ui" />
  </Router>
  , document.getElementById("container")
);
