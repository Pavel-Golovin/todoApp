import React from "react";
import "./task.css";

const Task = (props) => {

  const editForm = <input type="text" className="edit" value={props.content}/>;

  return (
    <li className={ props.className }>
      <div className="view">
        <input className="toggle" type="checkbox"/>
        <label>
          <span className="description">{props.content}</span>
          <span className="created">{props.creationTime}</span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy"></button>
      </div>
      {(props.className === "editing") ? editForm : null}
    </li>
  );
};

export default Task;
