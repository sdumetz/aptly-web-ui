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
    var newSelection = [target.Name]; //clone
    this.setState({selectedNames:newSelection});
  }
  handleSend(e){
    e.preventDefault();
    console.log("children : ",this.children)
    if (!this.snapshotName.value || !this.state.selectedNames[0]){
      alert("select a repo and a snapshot name");
      return;
    }
    var repoName = this.state.selectedNames[0];
    var data = {   Name:this.snapshotName.value }
    if (this.snapshotDesc.value){ data["Description"] = this.snapshotDesc.value}
    console.log(this.snapshotName, this.snapshotName)
    fetch(`/api/repos/${repoName}/snapshots`,{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify(data)
    }).then((r)=>{
      if (!r.ok){
        alert("Failed to create snapshot");
      }else{
        alert("snapshot created");
      }
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
        <label>Name</label>
        <input type="text" id="snapshot-name" placeholder="name" style={{width:"100%"}} ref={(input)=>this.snapshotName = input}/>
        <label>Description</label>
        <input type="text" id="snapshot-description" placeholder="description" style={{width:"100%"}} ref={(input)=>this.snapshotDesc = input}/>
        <button
          type="submit"
          className="mdl-button mdl-button--raised mdl-button--colored"
          style={{float:"right",textAlign:"right"}}
          onClick={this.handleSend.bind(this)}>Take Snapshot</button>
      </form>
      <span>Partial snapshots not supported yet</span>
    </div>)
  }
}
