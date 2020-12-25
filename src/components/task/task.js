import React, {Component} from "react";
import "./task.css";

export default class Task extends Component {

  render() {
    return (
      <div className="view">
        <input className="toggle" type="checkbox"/>
        <label>
          <span className="description">{this.props.label}</span>
          <span className="created">{this.props.creationTime}</span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy"></button>
      </div>
    );
  }
};
