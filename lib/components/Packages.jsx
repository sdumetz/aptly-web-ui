import React from "react"
import request from "../helpers/request.js"

export default class Repos extends React.Component{
  _handleClick(index, ev){
    this.props.select(index);
  }
  render(){
    var elems = this.props.list.map((el,i)=>{
     return (<tr key = {encodeURIComponent(el.Name)} onClick={this._handleClick.bind(this,i)}>
       <td>{el.Name}</td>
       <td>{el.Comment}</td>
       <td>{el.DefaultDistribution}</td>
       <td>{el.defaultComponent}</td>
     </tr>)
   })
   return (<tbody>{elems}</tbody>)
  }
}
