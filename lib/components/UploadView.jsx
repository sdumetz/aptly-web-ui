import React, { PropTypes } from "react"
import Dropzone from 'react-dropzone'
import UploadElement from './UploadElement.jsx'
import request from "../helpers/request.js"
import RepoPicker from "./RepoPicker.jsx"

import { connect } from 'react-redux'
import {upload, importUploadedFiles, toggleUpload, sendSelectedFiles,removeSelectedFiles} from "../actions"

class UploadView extends React.Component{
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
  handleSend(targetIndex){
    this.props.sendSelectedFiles(targetIndex);
  }
  handleRemove(){
    this.props.removeSelectedFiles();
  }
  render(){
    console.log("Files : ",this.props.files);
    var elements = Object.keys(this.props.files).map((name,index)=>{
      return <UploadElement name={name}  key={name} active={false} handleClick={this.handleToggle.bind(this,name)} {...this.props.files[name]}/>
    });
    return (<div style={{paddingTop:50}} >
      <div>
        <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
          <tbody>
            <tr><td colSpan={2}>
              <Dropzone onDrop={this.onDrop.bind(this)} style={{border:"none",minWidth:400}} >
                <div className="mdl-color-text--primary"><center>Drop files or click here to upload</center></div>
              </Dropzone>
            </td></tr>
          </tbody>
          <tbody>
            {elements}
          </tbody>
        </table>
      </div>
      <div>
        Target Repository :
        <RepoPicker
          handleClick = {this.handleSend.bind(this)}
          items = {this.props.items}
        />
      </div>
      <div style={{display:"flex",flexDirection:"row-reverse"}}>
        <button onClick={this.handleRemove.bind(this)} style={{margin:3}} className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent">Remove</button>
      </div>
    </div>)
  }
}

UploadView.PropTypes = {
  files: PropTypes.arrayOf(PropTypes.shape({name:PropTypes.string.isRequired}).isRequired).isRequired
}

function mapStateToProps(state){
  const files = state.uploads;
  const {items} = state.repos;
  return {files,items};
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
    sendSelectedFiles:(t)=>{
      return dispatch(sendSelectedFiles(t))
    },
    removeSelectedFiles:()=>{
      return dispatch(removeSelectedFiles())
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(UploadView)
