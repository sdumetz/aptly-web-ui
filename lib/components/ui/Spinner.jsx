import React from "react"

export default class Spinner extends React.Component{
  render(){
    var r = this.props.size ||65;
    var strokeWidth = this.props.strokeWidth||6;

    return (
      <svg className="spinner"  width={r} height={r} viewBox={`0 0 ${r} ${r}`} xmlns="http://www.w3.org/2000/svg">
       <circle className="path" fill="none" strokeWidth={strokeWidth} strokeLinecap="round" cx={r/2} cy={r/2} r={r/2-strokeWidth}></circle>
      </svg>
    )
  }
}
