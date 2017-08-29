import React from "react"
import SnapList from "./SnapList.jsx"
export default class SnapView extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return (<div>
      <SnapList/>
    </div>)
  }
}
