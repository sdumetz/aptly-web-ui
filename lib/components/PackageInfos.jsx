import React from "react"
import version_compare from "node-version-compare"
import request from "../helpers/request.js"
import Package from "./Package.jsx"
import PackageDetails from "./PackageDetails.jsx"
import Spinner from "./ui/Spinner.jsx"
export default class PackageInfos extends React.Component{
  constructor(props){
    super(props)
    this.state={infos:{}}
  }
  componentWillReceiveProps(nextProps){
    console.log(nextProps);
    this.getKey(nextProps.packages[nextProps.routeParams.name]);
  }
  getKey(key){
    key = key||this.props.packages[this.props.routeParams.name];
    if(!key) return;
    request.getJSON(`/api/packages/${encodeURIComponent(key[0].key)}`).then((r)=>{
      console.log("set state")
      this.setState({infos:r});
    })
  }
  makePackagesList(){
    if(this.props.packages[this.props.routeParams.name]){
      return (<Package name={this.props.routeParams.name} repo = {this.props.routeParams.repo} infos={this.props.packages[this.props.routeParams.name]} expand={true}/>)
    }else{
      return (<tbody></tbody>)
    }
  }
  makePackageInfos(){
    if(!this.state.infos ||!this.state.infos.Package){
      return (<div>
        <h4>{this.props.routeParams.name}</h4>
        <div>Select a package in the list to see details</div>
      </div>)
    }else{
      return (<PackageDetails {...this.state.infos} repo={this.props.routeParams.repo}/>)
    }
  }
  render(){
    return (<div style={{display:"flex"}}>
      <div style={{padding:"0px 10px 25px 0px"}}>
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
