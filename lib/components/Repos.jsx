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
  lineStyle(){
    return {padding:"6px 18px 6px 18px",height:"auto"}
  }
  buildList(pack,index,name){
    return (<tr key={index} style={{height:"auto"}} className="package-line">
        <td style={this.lineStyle()} className="mdl-data-table__cell--non-numeric">{pack.arch}</td>
        <td style={this.lineStyle()} className="mdl-data-table__cell--non-numeric">{name}</td>
        <td style={this.lineStyle()} className="mdl-data-table__cell--non-numeric">{pack.version}</td>
    </tr>)
  }
  render(){
    var index = 0;
    var p = Object.keys(this.state.packages).reduce((elements,name)=>{
      var pack = this.state.packages[name];
      for(let i=0;i<pack.length;i++){
        elements.push(this.buildList(pack[i],index,(i==0)?name:""));
        index++;
      }
      return elements;
    },[])
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
