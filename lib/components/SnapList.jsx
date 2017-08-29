import React from "react"

import request from "../helpers/request.js"

function reduce_snapshots(snaps){
  return snaps.reduce(function(res,s, idx){
    res.push((<Snap {...s} key={idx} />))
    return res
  },[])
}
function Snap(props){
  return (<tr>
    <td>{props.Name}</td>
    <td>{props.CreatedAt}</td>
    <td>{props.Description}</td>
  </tr>)
}

function SnapTable(props){
  return (<table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp" style={{marginTop:"30px"}}>
    <thead><tr>
      <th  className="mdl-data-table__cell--non-numeric">Name</th>
      <th  className="mdl-data-table__cell--non-numeric">Date</th>
      <th  className="mdl-data-table__cell--non-numeric">Description</th>
    </tr></thead>
    <tbody>
      {props.children}
    </tbody>
  </table>)
}

export default class SnapList extends React.Component{
  constructor(props){
    super(props);
    this.state = {snapshots:[]};
  }
  componentDidMount(){
    request.getJSON(`/api/snapshots`).then((s)=> this.setState({snapshots:s}))
  }
  render(){
    if (!this.state.snapshots) return(<div>No snapshots</div>);
    return (
      <SnapTable>
        {reduce_snapshots(this.state.snapshots)}
      </SnapTable>
    )
  }
}
