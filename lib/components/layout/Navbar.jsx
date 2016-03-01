import React from "react"
import {Link} from 'react-router'

export default class Navbar extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    console.log(this.props);
    var paths = [];
    if(this.props.params["repo"]){
      paths.push((<Link to={`/ui/repos/${this.props.params["repo"]}`} key="repo" className="mdl-navigation__link">{this.props.params["repo"]}</Link>))
      if(this.props.params["name"]){
        paths.push((<Link to={`/ui/repos/${this.props.params["repo"]}/packages/${this.props.params["name"]}`} key="name" className="mdl-navigation__link">{this.props.params["name"]}</Link>))
      }
    }
    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header has-drawer">
      <header className="mdl-layout__header is-casting-shadow">
        <div className="mdl-layout__header-row">
          <span className="mdl-layout-title">{this.props.title}</span>
          <nav className="mdl-navigation nav-path" style={{width:"100%"}}>
            <Link to="/ui" className="mdl-navigation__link">Home</Link>
            {paths}
          </nav>
          </div>
        </header>
    </div>
  )
  }
}
