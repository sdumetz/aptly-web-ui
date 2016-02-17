import React from "react"
import request from "../helpers/request.js"
import Table from "./Table.jsx"
import Navbar from "./Navbar.jsx"
import Footer from "./Footer.jsx"

export default class Root extends React.Component{
  constructor(props){
    super(props)
    this.state={repos:[]}
  }
  static get contextTypes(){
    return {router: React.PropTypes.object.isRequired}
  }
  componentDidMount(){
    request.getJSON("/api/repos").then((r)=>{
      console.log(r);
      this.setState({repos:r});
    });
  }
  render(){
    var children = this.props.children || (<div>
    <Table list={this.state.repos} /></div>)
    return (<div className="root mdl-layout__container">
      <Navbar title="Aptly Web UI" />
      <div className="content" style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",paddingTop:"70px"}}>
        {children}
      </div>
      <Footer/>
    </div>)
  }
}
