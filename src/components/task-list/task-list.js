import React from "react";
import Task from "../task";
import "./task-list.css";

const TaskList = (props) => {

  const getTodosToBeShown = () => {
    const {todos, currentFilter} = props;
    switch (currentFilter) {
      case "Completed":
        return todos.filter((todo) => todo.completed === true);
      case "Active":
        return todos.filter((todo) => todo.completed === false);
      case "All":
        return todos;
      default:
        return todos;
    }
  }

  const classControl = (isCompleted, isToBeEdited) => {
    let className = null;

    if (isCompleted) {
      className = "completed";
    }
    if (isToBeEdited) {
      className = "editing";
    }
    return className;
  }

  const elements = getTodosToBeShown().map(({toBeEdited, completed, id, ...otherProps}) => {

    let classValue = classControl(completed, toBeEdited);

    return (
      <li className={ classValue } key={id}>
        <Task
          {...otherProps}
          onCompleted={() => props.onCompleted(id)}
          onDestroyed={() => props.onDestroyed(id)}
          onEdit={() => props.onEditing(id)}
          onEditTask={(text) => props.onEditTask(id, text)}
          className={ classValue }
        />
      </li>
    );
  });

  return <ul className="todo-list"> {elements} </ul>
};

export default TaskList;
