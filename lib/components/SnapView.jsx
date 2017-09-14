import React from "react"
import SnapList from "./SnapList.jsx"
import SnapCommand from "./SnapCommand.jsx"

import { connect } from 'react-redux'

class SnapView extends React.Component{
  constructor(props){
    super(props);
    console.log("props : ",props)
  }
  get repos(){
  }
  render(){
    return (<div>
      <SnapList />
      <SnapCommand items={this.props.items} />
    </div>)
  }
}
function mapStateToProps(state){
  const {items} = state.repos;
  return {items};
}

export default connect(mapStateToProps)(SnapView)
