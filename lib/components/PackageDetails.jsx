import React from "react"
import Dialog from "./ui/Dialog.jsx"
import request from "../helpers/request.js"
export default class PackageDetails extends React.Component{
  constructor(props){
    super(props);
    this.state = {confirm:null}
  }
  confirm(handle){
    this.setState({confirm:{title:"Really Delete?",text:`${this.props.Package}-${this.props.Version} (${this.props.repo})`,handle:handle}});
  }
  handleRemove(valid){
    if(valid){
      request.delete(`/api/repos/${this.props.repo}/packages`,JSON.stringify({PackageRefs:[this.props.Key]})).then(function(r){
        console.log("deleted package : ",this.props.Key);
      });
    }
    this.setState({confirm:null});
  }
  render(){
    var dialog = (this.state.confirm)?<Dialog {...this.state.confirm}/>:"";
    return (<div>
      <h4>{this.props.Package}</h4>
      {dialog}
      <div>Version : <b>{this.props.Version}</b></div>
      <div style={{maxWidth:"500",padding:"10px",boxShadow: "0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12)"}}>
        {this.props.Description}
      </div>
      <div style={{padding:"10px"}}>
        <button onClick={this.confirm.bind(this,this.handleRemove.bind(this))} className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent">Remove</button>
      </div>
    </div>)
  }
}
