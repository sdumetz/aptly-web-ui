import React from "react"
import request from "../helpers/request.js"

export default class Footer extends React.Component{
  constructor(props){
    super(props)
    this.state={version:"undefined"}
  }
  componentDidMount(){
    request.getJSON("/api/version").then((r)=>{
      this.setState({version:r.Version})
    })
  }
  render(){
    return (<div>Version : {this.state.version}</div>)
  }
}
