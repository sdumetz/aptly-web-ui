import React from "react"
import version_compare from "node-version-compare"
import request from "../helpers/request.js"
import parseKey from "../helpers/parseKey.js"
import Package from "./Package.jsx"
import PackagesList from "./PackagesList.jsx"

export default class RepoView extends React.Component{
  constructor(props){
    super(props)
    this.state={packages:{},active:null}
  }
  componentDidMount(){
    request.getJSON(`/api/repos/${this.props.routeParams.repo}/packages`).then((r)=>{
      //console.log(r);
      var packages = r.reduce((els,str)=>{
        var infos = parseKey(str);
        if(!els[infos.name]){
          els[infos.name] = [];
        }
        els[infos.name].push(infos);
        els[infos.name] = els[infos.name].sort(this.sortByVersion); //suboptimal : we sort on every addition.
        return els;
      },{});
      this.setState({packages:packages});
    });
  }
  sortByVersion(a,b){
    return - version_compare(a.version,b.version)
  }
  render(){
    var children;
    console.log("render with state : ",this.state.packages)
    if(this.props.children){
      children = React.cloneElement(this.props.children,{packages:this.state.packages});
    } else {
      children = <PackagesList packages={this.state.packages} name={this.props.routeParams.repo}/>;
    }
    return (<div>{children}</div>)
    }
}
