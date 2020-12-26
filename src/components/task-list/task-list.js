import React, {Component} from "react";
import Task from "../task";
import "./task-list.css";

export default class TaskList extends Component {

  render() {
    const elements = this.props.todos.map(({isCompleted, id, ...otherProps}) => {
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
