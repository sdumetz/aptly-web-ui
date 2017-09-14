import React from "react"
import RepoPicker from "./RepoPicker.jsx"

export default class SnapCommand extends React.Component{
  constructor(props){
    super(props);
    this.state = {selectedNames:[], snapName:""};
  }
  handleClick(index){
    var target = this.props.items[index];
    var idx = this.state.selectedNames.indexOf(target.Name);
    var newSelection = this.state.selectedNames.slice(0); //clone

    if (idx == -1) { // toggle
      newSelection.push(target.Name);
    }else{
      newSelection.splice(idx,1);
    }
    this.setState({selectedNames:newSelection});
  }
  handleSend(e){
    console.log(e.dispatchConfig);
    e.preventDefault();
    if (!this.state.snapName || !this.state.selectedNames.length ){
      alert("select a repo and a snapshot name");
      return;
    }
    this.state.selectedNames.forEach((repoName)=>{
      fetch(`/api/repos/${repoName}/snapshots`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({Name:this.state.snapName})
      })
    })

    return false;
  }
  render(){
    return (<div>
      <h3>Make a full snapshot of :</h3>
      <form >
        <RepoPicker
          items={this.props.items}
          active={this.state.selectedNames}
          handleClick={this.handleClick.bind(this)}/>
        <button type="submit" onClick={this.handleSend.bind(this)}>Take Snapshot</button>
      </form>
      <span>Partial snapshots not supported yet</span>
    </div>)
  }
}
