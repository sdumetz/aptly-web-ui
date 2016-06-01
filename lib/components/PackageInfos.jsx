import React from "react"
import request from "../helpers/request.js"
import parseKey from "../helpers/parseKey.js"
import Package from "./Package.jsx"
import PackageDetails from "./PackageDetails.jsx"
import Dialog from "./ui/Dialog.jsx"
export default class PackageInfos extends React.Component{
  constructor(props){
    super(props)
    this.state={infos:{},key:""}
  }
  static get contextTypes(){
    return {router: React.PropTypes.object.isRequired}
  }
  componentDidMount(){
    this.getKey(this.props.location.query.key)
  }
  componentWillReceiveProps(nextProps){
    this.getKey(nextProps.location.query.key);
  }
  getKey(key){
    if(!key) return this.setState({infos:{}});

    request.getJSON(`/api/packages/${encodeURIComponent(key)}`).then((r)=>{
      this.setState({infos:r,key:key});
    })
  }
  makePackagesList(){
    if(this.props.packages[this.props.routeParams.name]){
      return (<Package name={this.props.routeParams.name}
        repo = {this.props.routeParams.repo}
        infos={this.props.packages[this.props.routeParams.name]}
        activeKey={this.state.key} expand={true}
      />)
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
      return (<div>
        <PackageDetails {...this.state.infos} repo={this.props.routeParams.repo} name={this.props.routeParams.name}/>
        <div>
          <a style={btnStyle} onClick={this.confirmBox.bind(this,this.handleRemove.bind(this))} className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent">Remove</a>
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
    return (<div style={{display:"flex"}}>
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
