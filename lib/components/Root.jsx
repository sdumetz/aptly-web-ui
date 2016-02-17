import React from "react"
import request from "../helpers/request.js"
import Table from "./Table.jsx"
import Navbar from "./Navbar.jsx"
export default class Root extends React.Component{
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
    var children = this.props.children || (<div><h1>Available Repositories</h1>
    <Table list={this.state.repos} /></div>)
    return (<div className="root">
      <Navbar/>
      <div className="content" style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
        {children}
      </div>
    </div>)
  }
}
