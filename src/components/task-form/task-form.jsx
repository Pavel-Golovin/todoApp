import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './task-form.css';

export default class TaskForm extends Component {
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

  validateTimer = (value, id) => {
    switch (true) {
      case Number.isNaN(Number(value)):
        return '';
      case id === 'seconds' && Number(value) > 59:
        return '59';
      default:
        return value;
    }
  };

  onTaskHandler = (evt) => {
    const { value } = evt.target;
    this.setState({ value });
  };

  onMinHandler = (evt) => {
    const { value, id } = evt.target;
    this.setState({ minutes: this.validateTimer(value, id) });
  };

  onSecHandler = (evt) => {
    const { value, id } = evt.target;
    this.setState({ seconds: this.validateTimer(value, id) });
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
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          onChange={this.onMinHandler}
          onKeyDown={this.onKeyHandler}
          value={minutes}
          id="minutes"
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          onChange={this.onSecHandler}
          onKeyDown={this.onKeyHandler}
          value={seconds}
          id="seconds"
        />
      </form>
    );
  }
}
