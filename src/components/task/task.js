import React, {Component} from "react";
import {formatDistanceToNow} from "date-fns"
import "./task.css";

export default class Task extends Component {

  state = {
    value: this.props.text
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    this.props.onEditTask(this.state.value);
  }

  onInputChange = (e) => {
    this.setState(() => {
      return {
        value: e.target.value
      }
    })
  }


  render() {

    const {text, className, creationTime, onCompleted, onDestroyed, onEdit} = this.props;

    return (
      <form onSubmit={this.onFormSubmit}>
        <div className="view">
          <input className="toggle" type="checkbox"/>
          <label
            onClick={onCompleted}
          >
            <span className="description">{text}</span>
            <span className="created">{`created ${formatDistanceToNow(creationTime, {includeSeconds: true})} ago`}</span>
          </label>
            <button type="button" className="icon icon-edit"
              onClick={(e) => {
                e.preventDefault();
                onEdit();
                }
              }
            />
            <button type="button" className="icon icon-destroy"
              onClick={onDestroyed}
            />
        </div>
        {(className === "editing") ?
          <input type="text" className="edit" value={this.state.value} onChange={this.onInputChange}/> : null
        }
      </form>
    );
  }
}
