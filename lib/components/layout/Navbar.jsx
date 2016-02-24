import React from "react"
import {Link} from 'react-router'

export default class Navbar extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header has-drawer">
      <header className="mdl-layout__header is-casting-shadow">
        <div className="mdl-layout__header-row">
          <span className="mdl-layout-title">{this.props.title}</span>
          <nav className="mdl-navigation" style={{width:"100%"}}>
            <Link to="/ui" className="mdl-navigation__link">Home</Link>
          </nav>
          </div>
        </header>
    </div>
  )
  }
}
