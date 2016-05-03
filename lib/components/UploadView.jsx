import React, { PropTypes } from "react"
import Dropzone from 'react-dropzone'
import UploadElement from './UploadElement.jsx'
import request from "../helpers/request.js"
import RepoPicker from "./RepoPicker.jsx"

import { connect } from 'react-redux'
import {upload, importUploadedFiles, toggleUpload, sendFiles} from "../actions"

export default class UploadView extends React.Component{
  constructor(props){
    super(props)
  }
  componentDidMount(){
    this.props.importUploadedFiles();
  }

  onDrop(files) {
    files.forEach((file)=>{
      this.props.upload(file);
    })
  }
  handleToggle(name){
    this.props.toggleUpload(name);
  }
  handleSend(){
    this.props.sendFiles();
  }
  render(){
    var elements = Object.keys(this.props.files).map((name,index)=>{
      return <UploadElement name={name}  key={name} active={false} handleClick={this.handleToggle.bind(this,name)} {...this.props.files[name]}/>
    });
    return (<div style={{paddingTop:50}} >
      <div>
        Target Repository :
        <RepoPicker/>
      </div>
      <div>
        <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
          <tbody>
            <tr><td colSpan={2}>
              <Dropzone onDrop={this.onDrop.bind(this)} style={{border:"none"}} >
                <div className="mdl-color-text--primary"><center>Drop files to upload</center></div>
              </Dropzone>
            </td></tr>
          </tbody>
          <tbody>
            {elements}
          </tbody>
        </table>
      </div>
      <div style={{padding:10}}>
        <button onClick={this.handleSend.bind(this)} style={{position:"relative",float:"right",marginTop:-20,marginRight:-20, clear:"both"}} className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent">Send</button>
      </div>
    </div>)
  }
}
UploadView.PropTypes = {
  files: PropTypes.arrayOf(PropTypes.shape({name:PropTypes.string.isRequired}).isRequired).isRequired
}
function mapStateToProps(state){
  const files = state.uploads;
  return {files:files};
}
function mapDispatchToProps(dispatch){
  return {
    importUploadedFiles:()=>{
      return dispatch(importUploadedFiles())
    },
    upload:(file)=>{
      return dispatch(upload(file))
    },
    toggleUpload:(name)=>{
      return dispatch(toggleUpload(name))
    },
    sendFiles:()=>{
      return dispatch(sendFiles())
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(UploadView)
