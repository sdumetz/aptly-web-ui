import React from "react"
import request from "../helpers/request.js"
import parseKey from "../helpers/parseKey.js"
import PackageDetails from "./PackageDetails.jsx"
export default class MigrateView extends React.Component{
  constructor(props){
    super(props)
    this.state = {presence:[]};
  }
  get infos(){
    return parseKey(this.props.routeParams.key);
  }
  componentDidMount(){
    request.getJSON("/api/repos").then((r)=>{
      var packages = r.map((repo)=>{
        return request.getJSON(`/api/repos/${repo.Name}/packages?q=${this.infos.name}_${this.infos.version}_${this.infos.arch}`).catch((e)=>{return []})
      });
      Promise.all(packages).then((p)=>{
        var fin = r.reduce(function(repos,repo,index){
          repos[repo.Name] = (packages[index].length >0)?true:false;
          return repos;
        },{});
        console.log("setState : ",fin)
        this.setState({presence:fin});
      });
    });
  }
  render(){
    var repos = Object.keys(this.state.presence).map((repo)=>{
      return (<tr key={repo}>
        <td>{repo}</td>
        <td>
          <label className="mdl-switch mdl-js-switch mdl-js-ripple-effect" htmlFor="switch-1">
            <input type="checkbox" id="switch-1" className="mdl-switch__input" checked={this.state.presence[repo]}/>
            <span className="mdl-switch__label"></span>
          </label>
        </td>
      </tr>)
    })
    return (<div style={{display:"flex"}}>
      <div style={{padding:"0px 10px 25px 0px"}}>
        <table>
        <thead>
          <tr><th>Repo</th><th>Presence</th></tr>
        </thead>
        <tbody>
          {repos}
        </tbody>
        </table>
      </div>
    </div>)
  }
}
