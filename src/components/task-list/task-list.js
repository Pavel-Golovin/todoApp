import React from "react";
import Task from "../task";
import "./task-list.css";

const TaskList = ({ todos }) => {

  const elements = todos.map(({className, id, ...otherProps}) => {

    const editForm = <input type="text" className="edit" defaultValue={otherProps.label}/>;

    return (
      <li className={ className } key={id}>
        <Task {...otherProps} />
        {(className === "editing") ? editForm : null}
      </li>
    );
  });

  return (
    <ul className="todo-list">
      { elements }
    </ul>
  );
};

export default TaskList;
