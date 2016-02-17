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
      this.setState({packages:r});
    });
  }
  render(){
    var p = this.state.packages.map(function(pack,index){
      var infos = pack.split(" "); // it'sl ike Pamd64 aptly 1.0.1 5d2eb872323a639f

      return (<tr key={index}>
        <td className="mdl-data-table__cell--non-numeric">{infos[0].slice(1)}</td>
        <td className="mdl-data-table__cell--non-numeric">{infos[1]}</td>
        <td className="mdl-data-table__cell--non-numeric">{infos[2]}</td>
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
