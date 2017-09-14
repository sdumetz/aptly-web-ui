'use strict';
import React, { PropTypes } from "react"

/* Global state can only have 1 active repo.
However this widget supports an array of props.active so it can be used for package migration and snapshots creation It takes properties :
 - handleClick : a callback handler. Gets element's index as a parameter
 - active : an array of pre-selected item names (optionnal)
 - items : an array of objects of shape : {Name:foo}
*/
function RepoPicker(props){
  var {active,items} = props;
  active = active ||[]; //default value

  const repos = items.map((r,index)=>{
    return (<label
      className="mdl-checkbox"
      style={{padding:5,width:"auto",height:40}}
      key={index}
      htmlFor={`picker-toggle-${index}`}>
      <input
        onChange={props.handleClick.bind(null,index)}
        type="checkbox"
        style={{display:"none"}}
        id={`picker-toggle-${index}`}
        className="mdl-checkbox__input"
        checked={( active.indexOf(r.Name) != -1)?true:false} />
      <span
        className={`mdl-button mdl-js-button mdl-js-ripple-effect ${( active.indexOf(r.Name) != -1)?"mdl-button--primary":""}`}>
        {r.Name}
      </span>
    </label>)
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
