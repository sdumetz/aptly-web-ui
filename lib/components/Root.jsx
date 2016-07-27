import React, { PropTypes } from "react"
import request from "../helpers/request.js"
import Table from "./Table.jsx"
import Navbar from "./layout/Navbar.jsx"
import Footer from "./layout/Footer.jsx"
import UploadButton from "./UploadButton.jsx"
import {Link} from 'react-router'

import { connect } from 'react-redux'
import {fetchReposIfNeeded} from "../actions"


export default class Root extends React.Component{
  constructor(props){
    super(props)
  }
  static get contextTypes(){
    return {router: React.PropTypes.object.isRequired}
  }
  componentDidMount(){
    this.props.fetchReposIfNeeded();
  }
  render(){
    var contentStyle = {
      display:"flex",
      flexDirection:"row",
      alignItems:"center",
      justifyContent:"center",

    }
    var children = this.props.children || (<div>

    <Table list={this.props.items} /></div>)
    return (<div className="root mdl-layout__container">
      <Navbar title="Aptly Web UI" {...this.props} />
      <div className="content" style={contentStyle}>
        {children}
        <div style={{padding:"15",alignSelf:"flex-end"}}>
          <UploadButton/>
        </div>
      </div>

      <Footer/>
    </div>)
  }
}

Root.PropTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({name:PropTypes.string.isRequired}).isRequired).isRequired
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
export default connect(mapStateToProps,mapDispatchToProps)(Root)
