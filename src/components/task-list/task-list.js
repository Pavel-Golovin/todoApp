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

    const elements = todosToShow.map(({isCompleted, id, ...otherProps}) => {
      let className = null;
      if (isCompleted) {
        className = "completed";
      }

      return (
        <li className={className} key={id}>
          <Task
            {...otherProps}
            onCompleted={() => this.props.onCompleted(id)}
            onDestroyed={() => this.props.onDestroyed(id)}
          />
          {(className === "editing") ? <input type="text" className="edit" defaultValue={otherProps.text}/> : null}
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
