import React from "react"
import {Link} from 'react-router'

class UploadButton extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return (<Link to={`/ui/upload`} >
      <button className="mdl-button mdl-js-button mdl-button--fab mdl-button--colored" title="Upload new package">
        <svg fill="#ffffff" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
        </svg>
      </button>
    </Link>)
  }
}

export default UploadButton
