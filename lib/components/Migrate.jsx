import React, { PropTypes } from "react"
import request from "../helpers/request.js"
import parseKey from "../helpers/parseKey.js"
import {fetchReposIfNeeded} from "../actions"
import { connect } from 'react-redux'

export default class Migrate extends React.Component{
  constructor(props){
    super(props)
    this.state = {presence:{},confirm:null};
  }
  componentDidMount(){
    this.props.fetchReposIfNeeded();
    this.getPackageInfos(this.props.pkey);
  }
  componentWillReceiveProps(nextProps){
    if (nextProps.pkey != this.props.pkey){
      this.getPackageInfos(nextProps.pkey);
    }
  }
  getPackageInfos(key){
    var infos = parseKey(key);
    var packages = this.props.items.map((repo)=>{
      return request.getJSON(`/api/repos/${repo.Name}/packages?q=${infos.name}_${infos.version}_${infos.arch}`).catch((e)=>{return []})
    });
    Promise.all(packages).then((p)=>{
      var fin = this.props.items.reduce(function(repos,repo,index){
        repos[repo.Name] = (p[index].length >0)?true:false;
        return repos;
      },{});
      this.setState({presence:fin});
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
    console.log("render",this.state.presence)
    var cellStyle = {
      padding:10,
      minWidth:50,
      cursor:"pointer"
    }
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
Migrate.PropTypes = {
  repos: PropTypes.arrayOf(PropTypes.shape({name:PropTypes.string.isRequired}).isRequired).isRequired
}
function mapStateToProps(state){
  const {items} = state.repos;
  return {items};
}
function mapDispatchToProps(dispatch){
  return {
    fetchReposIfNeeded:()=>{
      return dispatch(fetchReposIfNeeded())
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Migrate)
