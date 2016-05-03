import React from "react"
import request from "../helpers/request.js"
import Package from "./Package.jsx"
export default class PackagesList extends React.Component{
  makePackagesList(){
    console.log("packages : ",this.props)
    return Object.keys(this.props.packages).map((key,i)=>{
      return (<Package key={key} name={key} repo = {this.props.name} infos={this.props.packages[key]} expand={false}/>)
    });
  }
  render(){
    var index = 0;
    var p = <tbody>{this.makePackagesList()}</tbody>;

    return (<div>
      <div style = {{paddingTop:25}}>
        <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
          <thead><tr>
            <th className="mdl-data-table__cell--non-numeric">Arch</th>
            <th className="mdl-data-table__cell--non-numeric">Name</th>
            <th className="mdl-data-table__cell--non-numeric">Version</th>
          </tr></thead>
          {p}
        </table>
      </div>
    </div>)
  }
}
