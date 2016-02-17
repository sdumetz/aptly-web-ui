import React from "react"
import ReactDOM from "react-dom"
import { Router, Route, Link, browserHistory } from 'react-router'
import Root from "./components/Root.jsx"
import Repos from "./components/Repos.jsx"
import Footer from "./components/Footer.jsx"
import Navbar from "./components/Navbar.jsx"
ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Root}>
      <Route path="/repos/:name" component={Repos}/>
    </Route>
  </Router>
  , document.getElementById("container")
);
ReactDOM.render(
  <Footer/>
  , document.getElementById("footer")
);
