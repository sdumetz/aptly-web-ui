import React from "react"
import ReactDOM from "react-dom"
import { Router, Redirect, Route, Link, browserHistory } from 'react-router'

import createStore from "./createStore.js"
import {Provider} from "react-redux"

import Root from "./components/Root.jsx"
import RepoView from "./components/RepoView.jsx"
import SnapView from "./components/SnapView.jsx"
import PackageInfos from "./components/PackageInfos.jsx"
import UploadView from "./components/UploadView.jsx"
import DevTools from './components/DevTools.jsx';

const store = createStore();

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/ui" component={Root}>
        <Route path="/ui/repos/:repo" component={RepoView}>
          <Route path="/ui/repos/:repo/packages/:name" component={PackageInfos}/>
        </Route>
        <Route path="/ui/upload" component={UploadView}/>
        <Route path="/ui/snapshots" component={SnapView}/>
      </Route>
    </Router>
  </Provider>
  , document.getElementById("container")
);
if(process.env.NODE_ENV === 'development'){
  console.log('DEBUG');
  var dbug = document.createElement("DIV");
  dbug.style.position="absolute";
  dbug.style.top = "0px";
  dbug.style.left = "0px";
  document.body.appendChild(dbug);
  ReactDOM.render(<Provider store={store}><DevTools /></Provider>,dbug)
}
