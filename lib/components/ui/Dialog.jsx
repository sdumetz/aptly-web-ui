import React from "react"

export default class Dialog extends React.Component{
  cancel(){
    this.props.handle(false);
  }
  confirm(){
    this.props.handle(true);
  }
  render(){
    var overlayStyle={
      position:"fixed",
      zIndex:1001,
      top:0,
      left:0,
      width:"100%",
      height:"100%",
      display:"flex",
      backgroundColor:"rgba(0,0,0,0.1)",
      alignItems:"center",
      alignContent:"center",
      justifyContent:"center"
    }
    var mainStyle={
      padding:15,
      backgroundColor:"white"
    }
    return (
      <div style={overlayStyle}>
        <div className="mdl-dialog" style={mainStyle} onLoad={function(){console.log('onload')}} >
           <h4 className="mdl-dialog__title">{this.props.title}</h4>
           <div className="">{this.props.text}</div>
           <div className="mdl-dialog__actions">
            <button type="button" className="mdl-button "onClick={this.confirm.bind(this)} >Confirm</button>
              <button type="button" className="mdl-button mdl-button--accent close" onClick={this.cancel.bind(this)} >Cancel</button>
          </div>
        </div>
      </div>
    )
  }
}
