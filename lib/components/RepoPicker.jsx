'use strict';
import React, { PropTypes } from "react"

/* Global state can only have 1 active repo. However this widget supports an array of props.active so it can be used for package migration */
function RepoPicker(props){
  var {active,items} = props;
  active = active ||[]; //default value
  const repos = items.map((r,index)=>{
    return (<button
      className={`mdl-button mdl-js-button mdl-js-ripple-effect ${( active.indexOf(r.Name) != -1)?"mdl-button--primary":""}`}
      key={index}
      onClick={props.setActive.bind(null,index)}
      >
        {r.Name}
      </button>)
  })
  return (
    <div className="repo-picker">
      {repos}
    </div>
  )
}
RepoPicker.PropTypes = {
  setActive: PropTypes.func.isRequired,
  active: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({name:PropTypes.string.isRequired}).isRequired
  ).isRequired
}

export default RepoPicker
