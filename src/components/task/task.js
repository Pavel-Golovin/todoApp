import React, {Component} from "react";
import PropTypes from "prop-types";
import {formatDistanceToNow} from "date-fns"
import "./task.css";

export default class Task extends Component {

  static defaultProps = {
    text: 'undefinedTask',
    creationTime: new Date(),
    className: null,
    onCompleted: () => {},
    onDestroyed: () => {}
  }

  static propTypes = {
    text: PropTypes.string,
    creationTime: PropTypes.instanceOf(Date),
    className:  PropTypes.string,
    onCompleted: PropTypes.func,
    onDestroyed: PropTypes.func
  }

  state = {
    value: this.props.text,
    distance: formatDistanceToNow(this.props.creationTime, {includeSeconds: true})
  }

  update = () => {
    this.setState({
      distance: formatDistanceToNow(this.props.creationTime, {includeSeconds: true})
    });
  };

  componentDidMount = () => {
    this.timerID = setInterval(
      () => this.update(),
      1000
    );
  };

  componentWillUnmount = () => {
    clearTimeout(this.timerID);
  };

  onFormSubmit = (e) => {
    e.preventDefault();
    this.props.onEditTask(this.state.value);
  }

  onInputChange = (e) => {
    this.setState(() => ({
        value: e.target.value
      }))
  }


  render() {

    const {text, className, onCompleted, onDestroyed, onEditing} = this.props;

    return (
      <form onSubmit={this.onFormSubmit}>
        <div className="view">
          <input className="toggle" type="checkbox"/>
          <label
            onClick={onCompleted}
          >
            <span className="description">{text}</span>
            <span className="created">{
              `${this.state.distance}`
            }</span>
          </label>
            <button type="button" className="icon icon-edit"
              onClick={(e) => {
                e.preventDefault();
                onEditing();
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
