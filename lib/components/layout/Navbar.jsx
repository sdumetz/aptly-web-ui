import React from "react"
import {Link} from 'react-router'

function NavLink(props){
  return (<Link to={props.to} key={props.key} className="mdl-navigation__link">
    <span>{props.text}</span>
  </Link>)
}

export default class Navbar extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    var paths = [(<NavLink
      to={`/ui/`}
      key="home"
      text="Home"/>
    )];
    if(this.props.params["repo"]){
      paths.push((<NavLink
        to={`/ui/repos/${this.props.params["repo"]}`}
        key="repo"
        text={this.props.params["repo"]}/>
      ))
    }
    if(this.props.params["name"]){
      paths.push((<NavLink
        to={`/ui/repos/${this.props.params["repo"]}/packages/${this.props.params["name"]}`}
        key="name" text={this.props.params["name"]}/>
      ))
    }
    //TODO Extend menu when at "Home" level

    return (
      <header className="mdl-layout__header is-casting-shadow">
        <div className="mdl-layout__header-row">
          <span className="docs-layout-title mdl-layout-title" style={{paddingRight:10}}><Link to="/ui" >{this.props.title}</Link></span>
          <nav className="mdl-navigation nav-path" style={{width:"100%"}}>
            {paths}
          </nav>
          </div>
        </header>
  )
  }
}
