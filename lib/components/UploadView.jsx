import React from "react"
import Dropzone from 'react-dropzone'
import UploadElement from './UploadElement.jsx'
import request from "../helpers/request.js"
export default class UploadView extends React.Component{
  constructor(props){
    super(props)
    this.state = {uploads:[],selected:[]};
  }
  componentDidMount(){
    request.getJSON("/api/files/upload").then((files)=>{
      this.push(files.map(function(file){
        return {name:file,finished:true}
      }),true);
    }).catch(function(e){
      console.log("Error fetching existing uploaded files : ",e)
    })
  }
  push(elements){
    if (elements.length===0){return;}
    Array.prototype.unshift.apply(this.state.uploads,elements);
    this.setState({uploads:this.state.uploads})
  }
  onDrop(files) {
    this.push(files);
  }
  handleChange(){
    console.log("change")
  }
  render(){
    var elements = this.state.uploads.map((e)=>{
      return <UploadElement file={e} uploaded={e.finished} key={e.name} onClick={this.handleChange.bind(this)}/>
    });
    return (<div style={{paddingTop:50}} >
      <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
        <tbody>
          <tr><td colSpan={2}>
            <Dropzone onDrop={this.onDrop.bind(this)} style={{border:"none"}} >
              <div className="mdl-color-text--primary">Drop files to upload</div>
            </Dropzone>
          </td></tr>
        </tbody>
        <tbody>
          {elements}
        </tbody>
      </table>
    </div>)
  }
}
