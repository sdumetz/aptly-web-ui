import React from "react"
import request from "../helpers/request.js"
import parseKey from "../helpers/parseKey.js"
import getPackagePath from "../helpers/getPackagePath.js"
import Package from "./Package.jsx"
import PackageDetails from "./PackageDetails.jsx"
import Migrate from "./Migrate.jsx"
import Dialog from "./ui/Dialog.jsx"


import { connect } from 'react-redux'

class PackageInfos extends React.Component{
  constructor(props){
    super(props)
    this.state={infos:{},key:""}
  }
  static get contextTypes(){
    return {router: React.PropTypes.object.isRequired}
  }

  componentDidMount(){
    this.getInfosByKey(this.props.location.query.key)
  }

  componentWillReceiveProps(nextProps){
    this.getInfosByKey(nextProps.location.query.key);
  }
  /* Getters and setters for nested props */
  get repoName(){
    return this.props.routeParams.repo;
  }
  get repoInfos(){
    return this.props.items.find(r => r.Name == this.repoName)
  }
  get packageList(){
    return this.props.packages;
  }
  get packageName(){
    return this.props.routeParams.name;
  }
  get packageKey(){
    //DO NOT use this.props.location.query.key except to call getInfosByKey()
    return this.state.key;
  }
  get packageInfos(){
    return this.state.infos;
  }

  getInfosByKey(key){ //also, set state
    if(!key) return this.setState({infos:{}});

    request.getJSON(`/api/packages/${encodeURIComponent(key)}`).then((r)=>{
      this.setState({infos:r,key:key});
    });
  }

  makePackagesList(){
    console.log(this.packageList[this.packageName])
    if(this.packageList[this.packageName]){
      return (<Package name={this.packageName}
        repo = {this.repoName}
        infos={this.packageList[this.packageName]}
        activeKey={this.packageKey} expand={true} />
      )
    }else{
      return (<tbody></tbody>)
    }
  }
  makePackageInfos(){
    var btnStyle = {margin:5}
    if(!this.state.infos ||!this.state.infos.Package){
      return (<div>
        <h4>{this.props.routeParams.name}</h4>
        <div>Select a package in the list to see details</div>
      </div>)
    }else{
      let dl_link;
      if (this.repoInfos){
        dl_link = (<a
        style={btnStyle}
        href={getPackagePath(this.repoInfos.DefaultComponent, this.packageInfos.Filename)}
        className="mdl-button mdl-js-button mdl-button--raised">
        Download
        </a>)
      }
      return (<div>
        <PackageDetails {...this.state.infos} repo={this.props.routeParams.repo} name={this.props.routeParams.name}/>
        <div>
          <Migrate
            activeKey={this.state.key}
            name={this.props.params.name}
            repo={this.props.params.repo}/>
          <a style={btnStyle} onClick={this.confirmBox.bind(this,this.handleRemove.bind(this))} className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent">Remove</a>
          {dl_link}
        </div>
      </div>)
    }
  }
  confirmBox(handle){
    this.setState({confirm:{title:"Really Delete?",text:`${this.props.routeParams.name}${(this.state.infos.Version)?"-"+this.state.infos.Version:""} (${this.props.repo})`,handle:handle}});
  }

  handleRemove(valid){
    if(valid){
      request.delete(`/api/repos/${this.props.routeParams.repo}/packages`,{PackageRefs:[this.state.infos.Key]}).then((r)=>{
        return fetch(`/api/publish/:./${this.props.routeParams.repo}`,{method:"PUT",body:JSON.stringify({ForceOverwrite:true}),headers: {
          "Content-type": "application/json"
        }})
      }).then(()=>{
        window.location = `/ui/repos/${this.props.routeParams.repo}/packages/${this.props.routeParams.name}`;//We *WANT* the page refresh here. Otherwise we'd have to bubble up the change to edit available packages list.
      }).catch(function(e){
        console.warn("Error deleting ",this.props.Key,e);
        console.warn("preventing page refresh to keep context...");
      })
    }
    this.setState({confirm:null});
  }
  render(){
    var dialog = (this.state.confirm)?<Dialog {...this.state.confirm}/>:"";
    return (<div className="package-info" style={{display:"flex"}}>
      <div style={{padding:"0px 10px 25px 0px"}}>
      {dialog}
      {this.makePackageInfos()}
      </div>
      <div style={{padding:"0px 0px 25px 10px"}}>
        <h4>in {this.props.routeParams.repo}</h4>
        <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
          <thead><tr>
            <th className="mdl-data-table__cell--non-numeric">Arch</th>
            <th className="mdl-data-table__cell--non-numeric">Name</th>
            <th className="mdl-data-table__cell--non-numeric">Version</th>
          </tr></thead>
          {this.makePackagesList()}
        </table>
      </div>
    </div>)
  }
}


function mapStateToProps(state){
  const {items} = state.repos;
  return {items};
}

export default connect(mapStateToProps)(PackageInfos)
