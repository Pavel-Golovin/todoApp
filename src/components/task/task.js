import React from "react";
import "./task.css";

const Task = (props) => {

  const {text, creationTime, onCompleted} = props;

  return (
    <div className="view">
      <input className="toggle" type="checkbox"/>
      <label
        onClick={onCompleted}
      >
        <span className="description">{text}</span>
        <span className="created">{creationTime}</span>
      </label>
      <button className="icon icon-edit"></button>
      <button className="icon icon-destroy"></button>
    </div>
    );
}


export default Task;
