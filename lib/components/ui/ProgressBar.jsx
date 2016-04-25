import React from "react"

export default class ProgressBar extends React.Component{
  render(){
    var r = this.props.size ||250;
    var strokeWidth = this.props.strokeWidth||6;
    var progress = this.props.progress;
    return (
      <svg className="progress"  width={r} height={strokeWidth} viewBox={`0 0 ${r} ${strokeWidth}`} xmlns="http://www.w3.org/2000/svg">
       <line stroke="#103040" strokeWidth={strokeWidth} strokeLinecap="round" x1={0} y1={strokeWidth/2} x2={r*progress/100} y2={strokeWidth/2}/>
      </svg>
    )
  }
}
