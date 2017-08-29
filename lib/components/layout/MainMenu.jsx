import React from "react"
import { Link } from 'react-router'

function MenuItem(props){
  return (<li key={props.name} style={{float:"left"}}>
    <Link className="mdl-button mdl-js-button mdl-js-ripple-effect" to={props.to} >{props.name}</Link></li>)
}

export default function MainMenu(props){
  return (<ul style={{listStyleType:"none"}}>
    <MenuItem name="snapshots" to="/ui/snapshots"/>
    <MenuItem name="uploads" to="/ui/upload"/>
  </ul>)
}
