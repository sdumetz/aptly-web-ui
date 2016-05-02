import React from "react"
import ReactDOM from "react-dom"
import { Router, Redirect, Route, Link, browserHistory } from 'react-router'

import createStore from "./createStore.js"
import {Provider} from "react-redux"

import Root from "./components/Root.jsx"
import RepoView from "./components/RepoView.jsx"
import PackageInfos from "./components/PackageInfos.jsx"
import UploadView from "./components/UploadView.jsx"


const store = createStore();

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/ui" component={Root}>
        <Route path="/ui/repos/:repo" component={RepoView}>
          <Route path="/ui/repos/:repo/packages/:name" component={PackageInfos}/>
        </Route>
        <Route path="/ui/upload" component={UploadView}/>
      </Route>
      <Redirect from="/" to="/ui" />
    </Router>
  </Provider>
  , document.getElementById("container")
);
