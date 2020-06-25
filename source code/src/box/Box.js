import React from "react";
import "./Box.css";

class Box extends React.Component {
  render() {
    return <div className="box" id={"box" + this.props.x + this.props.y} style={{ backgroundColor: this.props.color }} onClick={()=>this.props.onCellClick(this.props.x, this.props.y)}></div>;
  }
}

export default Box;
