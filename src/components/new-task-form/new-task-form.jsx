import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './new-task-form.css';

export default class NewTaskForm extends Component {
  state = {
    value: '',
  };

  onFormSubmit = (evt) => {
    evt.preventDefault();
    const { onSubmit } = this.props;
    const { value } = this.state;
    onSubmit(value);
    this.setState(() => ({
      value: '',
    }));
  };

  onInputChange = (evt) => {
    this.setState(() => ({
      value: evt.target.value,
    }));
  };

  render() {
    const { value } = this.state;

    return (
      <form className="new-todo-form" onSubmit={this.onFormSubmit}>
        <input className="new-todo" placeholder="Task" onChange={this.onInputChange} value={value} />
        <input className="new-todo-form__timer" placeholder="Min" />
        <input className="new-todo-form__timer" placeholder="Sec" />
      </form>
    );
  }
}

NewTaskForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
