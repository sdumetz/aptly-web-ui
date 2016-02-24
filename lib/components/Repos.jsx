import React from "react"
import request from "../helpers/request.js"

export default class Repos extends React.Component{
  constructor(props){
    super(props)
    this.state={packages:[]}
  }
  componentDidMount(){
    request.getJSON(`/api/repos/${this.props.routeParams.name}/packages`).then((r)=>{
      console.log(r);
      var packages = r.reduce((els,str)=>{
        var infos = str.split(" ");
        var name = infos[1];
        var arch = infos[0].slice(1);
        var version = infos[2];
        console.log("els : ",els)
        if(!els[name]){
          els[name] = [];
        }
        els[name].push({arch:arch,version:version});
        return els;
      },{});
      this.setState({packages:packages});
    });
  }
  buildList(pack,component){
    var elems = pack.map((p)=>{
      return (<li>{p[component]}</li>)
    });
    return (<ul style={{listStyle:"none",paddingLeft:"0px",textAlign:"center"}}>{elems}</ul>)
  }
  render(){

    var p = Object.keys(this.state.packages).map((name,index)=>{
      var pack = this.state.packages[name];
      var archs = this.buildList(pack,"arch")
      var versions = this.buildList(pack,"version")
      return (<tr key={index} className="package-line">
          <td className="mdl-data-table__cell--non-numeric">{archs}</td>
          <td className="mdl-data-table__cell--non-numeric">{name}</td>
          <td className="mdl-data-table__cell--non-numeric">{versions}</td>
      </tr>)
    })
    return (<div>
      <h1>{this.props.routeParams.name}</h1>
      <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
      <thead><tr>
        <th className="mdl-data-table__cell--non-numeric">Arch</th>
        <th className="mdl-data-table__cell--non-numeric">Name</th>
        <th className="mdl-data-table__cell--non-numeric">Version</th>
      </tr></thead>
      <tbody>
        {p}
      </tbody>
      </table>
      </div>)
    }
}
