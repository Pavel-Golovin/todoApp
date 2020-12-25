import React, {Component} from "react";
import Task from "../task";
import "./task-list.css";

export default class TaskList extends Component {

  elements = this.props.todos.map(({className, id, ...otherProps}) => {

    const editForm = <input type="text" className="edit" defaultValue={otherProps.label}/>;

    return (
        <li className={ className } key={id}>
          <Task {...otherProps} />
          {(className === "editing") ? editForm : null}
        </li>
    );
  });

  render() {
    return (
      <ul className="todo-list">
        { this.elements }
      </ul>
    );
  };
};
