import React from "react"
import request from "../helpers/request.js"
import Table from "./Table.jsx"
export default class Body extends React.Component{
  constructor(props){
    super(props)
    this.state={repos:[]}
  }
  componentDidMount(){
    request.getJSON("/api/repos").then((r)=>{
      console.log(r);
      this.setState({repos:r});
    });
  }
  render(){
    return (<div className="content">
      <h1>Available Repositories</h1>
      <Table list={this.state.repos} />
    </div>)
  }
}
