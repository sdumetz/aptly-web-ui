import React from "react"
import {Link} from 'react-router'

function NavLink(props){
  var className = "mdl-navigation__link";
  if (props.location && props.to == props.location.pathname ){
    className+= " active";
  }else{
    console.log("location:",props.location.pathname,props.to)
  }
  return (<Link to={props.to} key={props.key} className={className}>
    <span>{props.text}</span>
  </Link>)
}

export default class Navbar extends React.Component{
  constructor(props){
    super(props)
  }
  paths(){
    var paths = [(<NavLink
      to={`/ui/`}
      key="home"
      location={this.props.location}
      text="Home"/>
    )];
    if(this.props.params["repo"]){
      paths.push((<NavLink
        to={`/ui/repos/${this.props.params["repo"]}`}
        location={this.props.location}
        key="repo"
        text={this.props.params["repo"]}/>
      ))
    }
    if(this.props.params["name"]){
      paths.push((<NavLink
        to={`/ui/repos/${this.props.params["repo"]}/packages/${this.props.params["name"]}`}
        location={this.props.location}
        key="name" text={this.props.params["name"]}/>
      ))
    }
    return paths
  }
  extra_links(){
    return [
      (<NavLink to="/ui/snapshots" key="snapshots" text="snapshots" location={this.props.location} />),
      (<NavLink to="/ui/upload" key="upload" text="upload" location={this.props.location}/>)
    ]
  }
  render(){

    return (
      <header className="mdl-layout__header is-casting-shadow">
        <div className="mdl-layout__header-row">
          <span className="docs-layout-title mdl-layout-title" style={{paddingRight:10}}><Link to="/ui" >{this.props.title}</Link></span>
          <nav className="mdl-navigation nav-path" >
            {this.paths()}
          </nav>
          <div className="mdl-layout-spacer"></div>
          <nav className="mdl-navigation nav-path">
            {this.extra_links()}
          </nav>
        </div>

      </header>
  )
  }
}
