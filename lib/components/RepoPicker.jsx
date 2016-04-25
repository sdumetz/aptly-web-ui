import React from "react"
import request from "../helpers/request.js"

export default class RepoPicker extends React.Component{
  constructor(props){
    super(props);
    this.state={repos:[],activeindex:-1}
  }
  componentDidMount(){
    request.getJSON("/api/repos").then((r)=>{
      this.setState({repos:r});
    }).catch(function(e){
      console.log("error fetching repos",e);
    })
  }
  handleClick(index){
    if(this.state.activeindex != index){
      this.setState({activeindex:index});
    }else {
      this.setState({activeindex:-1});
    }
  }
  render(){
    return (
      <div className="">
        {this.state.repos.map((r,index)=>{
          return (<button className={`mdl-button mdl-js-button mdl-js-ripple-effect ${(this.state.activeindex === index)?"mdl-button--primary":""}`} key={index} onClick={this.handleClick.bind(this,index)}>
            {r.Name}
          </button>)
        })}
      </div>
    )
  }
}
