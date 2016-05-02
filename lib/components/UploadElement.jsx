import React, { PropTypes } from "react"
import Spinner from "./ui/Spinner.jsx"

import { connect } from 'react-redux'

class UploadElement extends React.Component{
  constructor(props){
    super(props)
    this.state = {progress:props.uploaded ||0,active:false};
  }
  componentDidMount(){
    if(this.props.uploaded !== true){
      this.upload(this.props.file);
    }
  }
  upload(file){
    var formData = new FormData();
    var req = new XMLHttpRequest();
    req.onprogress = (evt)=>{
      if (evt.lengthComputable) {
        this.setState({progress:(Math.floor(evt.loaded / evt.total)*100)})
      }
    }
    req.open('POST', '/api/files/upload', true);
    req.onreadystatechange = (aEvt)=> {
      if (req.readyState == 4){
        if(req.status == 200){
          console.log("Upload done.",req.statusText,req.responseText);
          this.setState({progress:true});
        }else{
          console.log(`Upload Error ${req.status} : ${req.statusText}`)
          this.setState({progress:false});
        }
      }
    };
    formData.append("file", file);
    req.send(formData);
  }
  readableSize(size){
    if(size>1000000){
      return Math.round(size/10000)/100+"Mb"
    }else if (size>1000){
      return Math.round(size/10)/100+"kb"
    }else{
      return size
    }
  }
  handleValidClick(){
    if(this.state.active == true) return;
    this.setState({active:true});
    
  }
  render(){
    var progress;
    if(this.state.progress === true){
      progress= (
        <button className="mdl-button mdl-js-button mdl-js-ripple-effect" onClick={this.handleValidClick.bind(this)}>
          <svg fill={(this.state.active)?"#00C853":"#000000"} height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0h24v24H0z" fill="none"/>
              <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
          </svg>
        </button>
      )
    }else if (this.state.progress === false){
      progress = (<svg fill="#ffffff" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0h24v24H0z" fill="none"/>
          <path d="M14.59 8L12 10.59 9.41 8 8 9.41 10.59 12 8 14.59 9.41 16 12 13.41 14.59 16 16 14.59 13.41 12 16 9.41 14.59 8zM12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
      </svg>);
    }else{
      progress = (<Spinner progress={this.state.progress} />)
    }
    return (<tr>
      <td>
        {progress}
      </td>
      <td>
        {this.props.file.name} {(this.props.file.size)?`(${this.readableSize(this.props.file.size)})`:""}
      </td>
    </tr>)
  }
}
function mapStateToProps(state){
  const {active,items} = state.repos;
  return {active,items};
}

export default connect(mapStateToProps)(UploadElement)
