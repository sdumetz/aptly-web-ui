import React from "react"
import Dialog from "./ui/Dialog.jsx"

export default function PackageDetails(props){
  return (<div className="package-detail">
    <h4>{props.Package}</h4>
    <div>Version : <b>{props.Version}</b></div>
    <div style={{maxWidth:"800",padding:"10px",boxShadow: "0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12)"}}>
      <pre>{props.Description}</pre>
    </div>
  </div>)
}
