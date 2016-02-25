import React from "react"
import version_compare from "node-version-compare"
import request from "../helpers/request.js"
import Package from "./Package.jsx"
export default class PackagesList extends React.Component{
  constructor(props){
    super(props)
    this.state={packages:[],active:null}
  }
  componentDidMount(){
    request.getJSON(`/api/repos/${this.props.routeParams.name}/packages`).then((r)=>{
      console.log(r);
      var packages = r.reduce((els,str)=>{
        var infos = str.split(" ");
        var name = infos[1];
        var arch = infos[0].slice(1);
        var version = infos[2];
        if(!els[name]){
          els[name] = [];
        }
        els[name].push({arch:arch,version:version});
        els[name] = els[name].sort(this.sortByVersion); //suboptimal : we sort on every addition.
        return els;
      },{});
      this.setState({packages:packages});
    });
  }
  sortByVersion(a,b){
    return - version_compare(a.version,b.version)
  }
  handleClick(name){
    
    if(!this.state.active){
      this.setState({active:name});
    }else{
      this.setState({active:null});
    }
  }
  makePackagesList(){
    return Object.keys(this.state.packages).map((key,i)=>{
      return (<Package key={key} name={key} repo = {this.props.routeParams.name} infos={this.state.packages[key]} expand={false} onClick={this.handleClick.bind(this)}/>)
    });
  }
  render(){
    var index = 0;
    var p;
    if(this.state.active){
      p= (<Package name={this.state.active} repo = {this.props.routeParams.name} infos={this.state.packages[this.state.active]} expand={true} onClick={this.handleClick.bind(this)}/>)
    }else{
        p = <tbody>{this.makePackagesList()}</tbody>;
    }

    return (<div>
      <h1>{this.props.routeParams.name}</h1>
      <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
      <thead><tr>
        <th className="mdl-data-table__cell--non-numeric">Arch</th>
        <th className="mdl-data-table__cell--non-numeric">Name</th>
        <th className="mdl-data-table__cell--non-numeric">Version</th>
      </tr></thead>
        {p}
      </table>
      </div>)
    }
}
