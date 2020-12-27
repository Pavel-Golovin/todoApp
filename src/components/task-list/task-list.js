import React, {Component} from "react";
import Task from "../task";
import "./task-list.css";

export default class TaskList extends Component {

  render() {

    let todosToShow;

    if (this.props.currentFilter === 'All') {
      todosToShow = this.props.todos;
    }

    if (this.props.currentFilter === 'Active') {
      todosToShow = this.props.todos.filter((todo) => todo.isCompleted !== true);
    }

    if (this.props.currentFilter === 'Completed') {
      todosToShow = this.props.todos.filter((todo) => todo.isCompleted === true);
    }

    const elements = todosToShow.map(({isEditing, isCompleted, id, ...otherProps}) => {
      let className = null;
      if (isCompleted) {
        className = "completed";
      }
      if (isEditing) {
        className = "editing";
      }

      return (
        <li className={className} key={id}>
          <Task
            {...otherProps}
            onCompleted={() => this.props.onCompleted(id)}
            onDestroyed={() => this.props.onDestroyed(id)}
            onEdit={() => this.props.onEditing(id)}
            onEditTask={(text) => this.props.onEditTask(id, text)}
            className={className}
          />
        </li>
        );
    });

    return (
      <ul className="todo-list">
        {elements}
      </ul>
    );
  }
};
