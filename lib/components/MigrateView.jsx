import React from "react"
import request from "../helpers/request.js"
import parseKey from "../helpers/parseKey.js"
import PackageDetails from "./PackageDetails.jsx"
import Dialog from "./ui/Dialog.jsx"
export default class MigrateView extends React.Component{
  constructor(props){
    super(props)
    this.state = {presence:[],confirm:null};
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
          repos[repo.Name] = (p[index].length >0)?true:false;
          return repos;
        },{});
        this.setState({presence:fin});
      });
    });
  }
  countActive(presence){
    return Object.keys(presence).reduce(function(count,repo){
      return (presence[repo])?count+1:count;
    },0);
  }
  handleChange(repo){
    var oldPresence = this.state.presence;
    var presence = new Object();
    Object.assign(presence,oldPresence);
    presence[repo]=!presence[repo];
    this.setState({
      presence:presence,
      confirm:(this.countActive(presence) == 0)?{
        title:`Remove ${this.infos.name}-${this.infos.version} from ${repo}?`,text:`It's the last occurence of this package's version and it will be forever deleted.`,
        handle:(function(ok){
          if(!ok){
            this.setState({presence:oldPresence,confirm:null});
          }else{
            this.setState({confirm:null});
          }
        }).bind(this)
      }:null
    });
  }
  render(){
    var dialog = (this.state.confirm)?<Dialog {...this.state.confirm}/>:"";
    var repos = Object.keys(this.state.presence).map((repo)=>{
      return (<tr key={repo}>
        <td className="mdl-data-table__cell--non-numeric">{repo}</td>
        <td className="mdl-data-table__cell--non-numeric">
          <label className="mdl-switch mdl-js-switch mdl-js-ripple-effect" htmlFor={`switch-${repo}`}>
            <input type="checkbox" id={`switch-${repo}`} className="mdl-switch__input" checked={this.state.presence[repo]} onChange={this.handleChange.bind(this,repo)}/>
          </label>
        </td>
      </tr>)
    })
    return (<div style={{display:"flex"}}>
      {dialog}
      <div style={{padding:"0px 10px 25px 0px"}}>
        <h4>{this.infos.name}</h4>
        <div>Version : <b>{this.infos.version}</b>. Arch : <b>{this.infos.arch}</b></div>
        <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
        <thead>
          <tr>
            <th className="mdl-data-table__cell--non-numeric">Repo</th>
            <th className="mdl-data-table__cell--non-numeric">Presence</th>
          </tr>
        </thead>
        <tbody>
          {repos}
        </tbody>
        </table>
      </div>
    </div>)
  }
}
