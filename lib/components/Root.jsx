import React from "react"
import request from "../helpers/request.js"
import Table from "./Table.jsx"
import Navbar from "./layout/Navbar.jsx"
import Footer from "./layout/Footer.jsx"
import {Link} from 'react-router'

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
      this.setState({repos:r});
    });
  }
  render(){
    var children = this.props.children || (<div>
      <div style={{paddingBottom:40}}>
        <Link to={`/ui/upload`} style={{position:"relative",float:"right",marginTop:-20,marginRight:-20, clear:"both"}}>
          <button className="mdl-button mdl-js-button mdl-button--fab mdl-button--colored" title="Upload new package">
            <svg fill="#ffffff" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                <path d="M0 0h24v24H0z" fill="none"/>
            </svg>
          </button>
        </Link>
      </div>
    <Table list={this.state.repos} /></div>)
    return (<div className="root mdl-layout__container">
      <Navbar title="Aptly Web UI" {...this.props} />
      <div className="content" style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
        {children}
      </div>
      <Footer/>
    </div>)
  }
}
