import React from "react";
import Task from "../task";
import "./task-list.css";

const TaskList = ({onCompleted, todos}) => {

  const elements = todos.map(({isCompleted, id, ...otherProps}) => {

    const editForm = <input type="text" className="edit" defaultValue={otherProps.text}/>;

    let className = null;

    if (isCompleted) {
      className = "completed";
    }

    return (
        <li className={className} key={id}>
          <Task
            {...otherProps}
            onCompleted={() => onCompleted(id)}
          />
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
