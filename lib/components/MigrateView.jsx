import React from "react"
import request from "../helpers/request.js"
import parseKey from "../helpers/parseKey.js"
import PackageDetails from "./PackageDetails.jsx"
export default class MigrateView extends React.Component{
  constructor(props){
    super(props)
  }
  static get contextTypes(){
    return {router: React.PropTypes.object.isRequired}
  }
  render(){
    return (<div style={{display:"flex"}}>
      <div style={{padding:"0px 10px 25px 0px"}}>
        {this.props.routeParams.key}
      </div>
    </div>)
  }
}
