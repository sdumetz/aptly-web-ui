import React from "react"
import {Link} from 'react-router'

export default class Navbar extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return (<nav className="mdl-navigation" style={{width:"100%"}}>
      <ul>
        <li><Link to="">Home</Link></li>
      </ul>
    </nav>)
  }
}
