import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './new-task-form.css';

export default class NewTaskForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    value: '',
    minutes: '',
    seconds: '',
  };

  defaultTimer = '00';

  onKeyHandler = (evt) => {
    const { onSubmit } = this.props;
    const { value, minutes, seconds } = this.state;
    if (evt.key === 'Enter') {
      onSubmit(value, minutes || this.defaultTimer, seconds || this.defaultTimer);
      this.setState({
        value: '',
        minutes: '',
        seconds: '',
      });
    }
  };

  onTaskHandler = (evt) => {
    const { value } = evt.target;
    this.setState({
      value,
    });
  };

  onMinHandler = (evt) => {
    const { value } = evt.target;
    this.setState({
      minutes: value,
    });
  };

  onSecHandler = (evt) => {
    const { value } = evt.target;
    this.setState({
      seconds: value,
    });
  };

  render() {
    const { value, minutes, seconds } = this.state;

    return (
      <form className="new-todo-form">
        <input
          className="new-todo"
          placeholder="Task"
          onChange={this.onTaskHandler}
          onKeyDown={this.onKeyHandler}
          value={value}
        />
        <input className="new-todo-form__timer" placeholder="Min" onChange={this.onMinHandler} value={minutes} />
        <input className="new-todo-form__timer" placeholder="Sec" onChange={this.onSecHandler} value={seconds} />
      </form>
    );
  }
}
