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
    onDestroyed: PropTypes.func,
    onEditTask: PropTypes.func.isRequired,
    onEditing: PropTypes.func.isRequired
  }
  
  /* eslint-disable  react/destructuring-assignment */

  state = {
    value: this.props.text,
    distance: formatDistanceToNow(this.props.creationTime, {includeSeconds: true})
  }
  
  /* eslint-enable  react/destructuring-assignment */

  update = () => {
    const {creationTime} = this.props;
    this.setState({
      distance: formatDistanceToNow(creationTime, {includeSeconds: true})
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
    const {onEditTask} = this.props;
    const {value} = this.state;
    onEditTask(value);
  }

  onInputChange = (e) => {
    this.setState(() => ({
        value: e.target.value
    }))
  }
  
  onButtonClickEdit = (e) => {
      e.preventDefault();
      const {onEditing} = this.props;
      onEditing();
  }


  render() {

    const {text, className, onCompleted, onDestroyed} = this.props;
    const {distance, value} = this.state;
    
    return (
      <form onSubmit={this.onFormSubmit}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            onClick={onCompleted}
          />
          <label>
            <span className="description">{text}</span>
            <span className="created">{
              `${distance}`
            }</span>
          </label>
          <label>
            <button type="button" className="icon icon-edit"
              onClick={this.onButtonClickEdit}
              aria-label="Редактировать"
            />
          </label>
          <label>
            <button type="button" className="icon icon-destroy"
              onClick={onDestroyed}
              aria-label="Удалить"
            />
          </label>
        </div>
        {(className === "editing") ?
          <input type="text" className="edit" value={value} onChange={this.onInputChange}/> : null
        }
      </form>
    );
  }
}
