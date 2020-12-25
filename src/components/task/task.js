import React from "react";
import "./task.css";

const Task = (props) => {
  return (
    <div className="view">
      <input className="toggle" type="checkbox"/>
      <label>
        <span className="description">{props.label}</span>
        <span className="created">{props.creationTime}</span>
      </label>
      <button className="icon icon-edit"></button>
      <button className="icon icon-destroy"></button>
    </div>
  );
};

export default Task;
