import React from "react"
import version_compare from "node-version-compare"
import request from "../helpers/request.js"
import Package from "./Package.jsx"
export default class PackageInfos extends React.Component{
  constructor(props){
    super(props)
    this.state={infos:{}}
  }
  componentDidMount(){
    this.getAt(0);

  }
  getAt(index){
    if(!this.props.packages[this.props.routeParams.name])return {};
    request.getJSON(`/api/packages/${encodeURIComponent(this.props.packages[this.props.routeParams.name][index].key)}`).then((r)=>{
      console.log(r);
    })
  }
  makePackagesList(){
    console.log(this)
    if(this.props.packages[this.props.routeParams.name]){
      return (<Package name={this.props.routeParams.name} repo = {this.props.repo} infos={this.props.packages[this.props.routeParams.name]} expand={true}/>)
    }else{
      return (<tbody></tbody>)
    }
  }
  makePackageInfos(){
    if(!this.state.infos ||!this.state.infos.name){
      return (<h1>{this.props.routeParams.name}</h1>)
    }
  }
  render(){
    return (<div style={{display:"flex"}}>
      <div style={{padding:"0px 10px 25px 0px"}}>{this.makePackageInfos()}</div>
      <div style={{padding:"0px 0px 25px 10px"}}>
        <h2>in {this.props.routeParams.repo}</h2>
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
