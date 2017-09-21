import React, { PropTypes } from "react"
import request from "../helpers/request.js"
import RepoPicker from "./RepoPicker.jsx"
import { connect } from 'react-redux'
import parseKey from "../helpers/parseKey";

import {updateRepo} from "../actions";

class Migrate extends React.Component{
  constructor(props){
    super(props);
    this.state = {active_in:[this.props.repo]};
  }

  componentWillReceiveProps(props){
    const p = parseKey(props.activeKey);
    const query = `${p.name}_${p.version}_${p.arch}`
    console.log("name:",query, props.activeKey);
    Promise.all(
      props.items.map((repo)=>fetch(`/api/repos/${repo.Name}/packages?q=${query}`)
      .then(r=>r.json()))
    ).then((responses)=>responses.reduce((foundList,res, idx)=>{
      if(res.length == 1){
        foundList.push(props.items[idx].Name);
      }
      return foundList;
    },[])).then((list)=>{this.setState({active_in:list})});
  }
  //triggered with repo's index in list, when any button in RepoPicker is clicked
  handleActiveChange(index){
    const targetRepo = this.props.items[index];
    const active_index = this.state.active_in.indexOf(targetRepo.Name);
    const lastState = active_index !== -1;
    let method = (lastState)?"DELETE":"POST";
    fetch(`/api/repos/${targetRepo.Name}/packages`,{
      method:method,
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({PackageRefs:[this.props.activeKey]})
    }).then((r)=>{
      //We're not interested in the response. Only status code.
      if(r.ok){
        console.log(`${(lastState)?"DELETED":"ADDED"} ${this.props.activeKey} in ${targetRepo.Name}`)
        let actives = this.state.active_in.slice();
        if (lastState){
          actives.splice(active_index,1);
        }else{
          actives.push(targetRepo.Name);
        }
        this.setState({active_in:actives})
        return true;
      }else{
        console.error(`Fail to ${(lastState)?"DELETE":"ADD"} ${this.props.activeKey} in ${targetRepo.Name}`)
        return false;
      }
    }).then(function(ok){
      if(!ok){return}
      return fetch(`/api/publish//${targetRepo.Name}`,{
        method:"POST"
      })
    })
  }
  render(){
    return (<div className="migrate" style={{display:"inline-block"}}>
      <RepoPicker
        handleClick = {this.handleActiveChange.bind(this)}
        active = {this.state.active_in}
        items = {this.props.items}
      />
    </div>);
  }
}
function mapStateToProps(state){
  const {items} = state.repos;
  return {items};
}

export default connect(mapStateToProps)(Migrate);
