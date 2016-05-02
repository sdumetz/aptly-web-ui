import React, { PropTypes } from "react"
import request from "../helpers/request.js"
import { connect } from 'react-redux'
import {setActive, fetchReposIfNeeded} from "../actions"

class RepoPicker extends React.Component{
  constructor(props){
    super(props);
    this.state={repos:[]}
  }
  componentDidMount(){
    this.props.fetchReposIfNeeded();
  }
  handleClick(index){
    if(this.state.activeindex != index){
      this.props.setActive(index);
    }else {
      this.props.setActive(-1);
    }
  }
  render(){
    const {active,items} = this.props
    return (
      <div className="">
        {items.map((r,index)=>{
          return (<button className={`mdl-button mdl-js-button mdl-js-ripple-effect ${(active === index)?"mdl-button--primary":""}`} key={index} onClick={this.handleClick.bind(this,index)}>
            {r.Name}
          </button>)
        })}
      </div>
    )
  }
}
RepoPicker.PropTypes = {
  setActive: PropTypes.func.isRequired,
  active: PropTypes.number.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({name:PropTypes.string.isRequired}).isRequired).isRequired
}
function mapStateToProps(state){
  const {active,items} = state.repos;
  return {active,items};
}
function mapDispatchToProps(dispatch){
  return {setActive:(index)=>{
      return dispatch(setActive(index))
    },
    fetchReposIfNeeded:()=>{
      return dispatch(fetchReposIfNeeded())
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(RepoPicker)
