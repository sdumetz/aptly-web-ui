import React from "react"
import Dialog from "./ui/Dialog.jsx"
import request from "../helpers/request.js"
export default class PackageDetails extends React.Component{
  constructor(props){
    super(props);
    this.state = {confirm:null}
  }
  static get contextTypes(){
    return {router: React.PropTypes.object.isRequired}
  }
  confirm(handle){
    this.setState({confirm:{title:"Really Delete?",text:`${this.props.Package}-${this.props.Version} (${this.props.repo})`,handle:handle}});
  }
  handleRemove(valid){
    if(valid){
      request.delete(`/api/repos/${this.props.repo}/packages`,{PackageRefs:[this.props.Key]}).then((r)=>{
        console.log("deleted package : ",this.props.Key);
        window.location = `/ui/repos/${this.props.repo}/packages/${this.props.name}`;//We *WANT* the page refresh here. Otherwise we'd have to bubble up the change to edit available packages list.
      });
    }
    this.setState({confirm:null});
  }
  render(){
    var dialog = (this.state.confirm)?<Dialog {...this.state.confirm}/>:"";
    var btnStyle = {margin:5}
    return (<div>
      <h4>{this.props.Package}</h4>
      {dialog}
      <div>Version : <b>{this.props.Version}</b></div>
      <div style={{maxWidth:"800",padding:"10px",boxShadow: "0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12)"}}>
        <pre>{this.props.Description}</pre>
      </div>
      <div style={{padding:"10px"}}>
        <a style={btnStyle} onClick={this.confirm.bind(this,this.handleRemove.bind(this))} className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent">Remove</a>
      </div>
    </div>)
  }
}
