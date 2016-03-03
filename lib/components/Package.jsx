import React from "react"

export default class Package extends React.Component{
  static get contextTypes(){
    return {router: React.PropTypes.object.isRequired}
  }
  lineStyle(){
    return {padding:"6px 18px 6px 18px",height:"auto"}
  }
  handleClick(key){
    if(key){ //Key exists only on longList items
      this.context.router.push(`/ui/repos/${this.props.repo}/packages/${this.props.name}?key=${encodeURIComponent(key)}`);
    }else{
      this.context.router.push(`/ui/repos/${this.props.repo}/packages/${this.props.name}`);
    }
  }
  buildItem(pack,index){
    console.log(this.props);
    var style = {
      height:"auto",
      backgroundColor: (pack.key && pack.key == this.props.activeKey)? "#3f51b5":null,
      color: (pack.key && pack.key == this.props.activeKey)? "#ffffff":null
    }
    return (<tr key={index} style={style} className="package-line" onClick={(this.expand)?null:this.handleClick.bind(this,pack.key)}>
        <td style={this.lineStyle()} className="mdl-data-table__cell--non-numeric">{pack.arch}</td>
        <td style={this.lineStyle()} className="mdl-data-table__cell--non-numeric">{(index ==0)?this.props.name:""}</td>
        <td style={this.lineStyle()} className="mdl-data-table__cell--non-numeric">{pack.version}</td>
    </tr>)
  }
  getArchs(){
    return this.props.infos.reduce((archs,info)=>{
      if(archs.indexOf(info.arch) == -1){
        archs = archs + ((archs === "")?"":", ")+info.arch;
      }
      return archs;
    },"");
  }
  longList(){
    var elements = []
    for(let i=0;i<this.props.infos.length;i++){
      elements.push(this.buildItem(this.props.infos[i],i));
    }
    return (<tbody>{elements}</tbody>);
  }
  shortList(){
    return this.buildItem({version:this.props.infos[0].version,arch:this.getArchs()},0)
  }
  render(){
    if(this.props.expand){
      return this.longList();
    }else{
      return this.shortList();
    }
  }
}
