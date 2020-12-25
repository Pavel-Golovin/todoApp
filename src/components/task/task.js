import React from "react";
import "./task.css";

const Task = (props) => {

  const {text, creationTime, onCompleted, onDestroyed} = props;

  return (
    <div className="view">
      <input className="toggle" type="checkbox"/>
      <label
        onClick={onCompleted}
      >
        <span className="description">{text}</span>
        <span className="created">{creationTime}</span>
      </label>
      <button className="icon icon-edit"/>
      <button className="icon icon-destroy"
        onClick={onDestroyed}
      />
    </div>
    );
}

export default Task;
