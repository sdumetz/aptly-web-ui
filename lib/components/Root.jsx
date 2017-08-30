import React, { PropTypes } from "react"
import request from "../helpers/request.js"
import Table from "./Table.jsx"
import Navbar from "./layout/Navbar.jsx"
import Footer from "./layout/Footer.jsx"
import UploadButton from "./UploadButton.jsx"
import MainMenu from "./layout/MainMenu.jsx"
import {Link} from 'react-router'

import { connect } from 'react-redux'
import {fetchReposIfNeeded} from "../actions"


class Root extends React.Component{
  constructor(props){
    super(props)
  }
  static get contextTypes(){
    return {router: React.PropTypes.object.isRequired}
  }
  componentDidMount(){
    this.props.fetchReposIfNeeded();
  }
  get has_upload(){
    return /\/ui(\/repos\/[-\w]*)?\/?$/.test(this.props.location.pathname);
  }
  render(){
    let btn;
    var contentStyle = {
      display:"flex",
      flexDirection:"row",
      alignItems:"center",
      justifyContent:"center",

    }
    var children = this.props.children || (<div>
      <MainMenu />
      <Table list={this.props.items} />
    </div>)
    if (this.has_upload){
       btn = (<div style={{padding:"15",alignSelf:"flex-end"}}>
        <UploadButton/>
      </div>)
    }
    return (<div className="root mdl-layout__container mdl-layout">
      <Navbar title="Aptly Web UI" {...this.props} />
      <div className="content" style={contentStyle}>
        {children}
        {btn}
      </div>
      <Footer/>
    </div>)
  }
}

Root.PropTypes = {
  have_upload: PropTypes.bool,
  items: PropTypes.arrayOf( PropTypes.shape({name:PropTypes.string.isRequired}).isRequired).isRequired
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
