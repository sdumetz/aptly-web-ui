import React from "react"
import request from "../helpers/request.js"

export default class Repos extends React.Component{
  constructor(props){
    super(props)
    this.state={packages:[]}
  }
  componentDidMount(){
    request.getJSON(`/api/repos/${this.props.routeParams.name}`).then((r)=>{
      console.log(r);
      this.setState({packages:r});
    });
  }
  render(){
    var p = this.state.packages.map(function(pack){
      return (<div>{pack}</div>)
    })
    return (<div>
      <h1>{this.props.routeParams.name}</h1>
      <div>{p}</div>
      </div>)
    }
}
