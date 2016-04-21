import React from "react"
import request from "../helpers/request.js"
import parseKey from "../helpers/parseKey.js"
export default class Migrate extends React.Component{
  constructor(props){
    super(props)
    this.state = {presence:[],confirm:null};
  }
  get infos(){
    return parseKey(this.props.pkey);
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
    //remove / add package to "repo"
    var stateChange = {}
    if(!this.state.presence[repo]){
      request.post("/api/repos/"+repo+"/packages",{"PackageRefs":[this.props.pkey]}).then(()=>{
        console.log("Added"+this.props.pkey+"to :"+repo);
        stateChange[repo] = true;
        this.setState({presence:Object.assign(this.state.presence,stateChange)});
      }).catch((e)=>{
        console.log("failed to add",this.props.pkey+"to : "+repo+". Error : ",e);
      })
    }else{
      request.delete("/api/repos/"+repo+"/packages",{"PackageRefs":[this.props.pkey]}).then(()=>{
        console.log("Removed"+this.props.pkey+"from :"+repo);
        stateChange[repo] = false;
        this.setState({presence:Object.assign(this.state.presence,stateChange)});
      }).catch((e)=>{
        console.log("failed to remove",this.props.pkey+"from : "+repo+". Error : ",e);
      })
    }
  }
  render(){
    var cellStyle = {
      padding:10,
      minWidth:50,
      cursor:"pointer"
    }
    var dialog = (this.state.confirm)?<Dialog {...this.state.confirm}/>:"";
    var repos = Object.keys(this.state.presence).map((repo)=>{
      return (<div className={(this.state.presence[repo])?"mdl-color--primary":""} style={cellStyle} key={repo} onClick={this.handleChange.bind(this,repo)}>
        {repo}
      </div>)
    })
    return (<div style={{display:"flex", padding:"0px"}} className="mdl-shadow--2dp">
      {repos}
    </div>)
  }
}
