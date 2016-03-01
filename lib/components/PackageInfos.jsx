import React from "react"
import version_compare from "node-version-compare"
import request from "../helpers/request.js"
import Package from "./Package.jsx"
export default class PackageInfos extends React.Component{
  makePackagesList(){
    if(this.props.packages[this.props.routeParams.name]){
      return (<Package name={this.props.routeParams.name} repo = {this.props.repo} infos={this.props.packages[this.props.routeParams.name]} expand={true}/>)
    }else{
      return (<tbody></tbody>)
    }
  }
  render(){
    return (<div>
      <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
        <thead><tr>
          <th className="mdl-data-table__cell--non-numeric">Arch</th>
          <th className="mdl-data-table__cell--non-numeric">Name</th>
          <th className="mdl-data-table__cell--non-numeric">Version</th>
        </tr></thead>
        {this.makePackagesList()}
      </table>
    </div>)
  }
}
