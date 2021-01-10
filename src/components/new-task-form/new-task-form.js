import  React, {Component} from "react";
import  PropTypes from "prop-types";
import "./new-task-form.css";

export default class NewTaskForm extends Component {

  state = {
    value: ''
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.value);
    this.setState(() => {
      return {
        value: ''
      }
    })
  }

  onInputChange = (e) => {
    this.setState(() => {
      return {
        value: e.target.value
      }
    })
  }

  render() {

    return (
      <form onSubmit={this.onFormSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onChange={this.onInputChange}
          value={this.state.value}
        />
      </form>
    );
  };
};

NewTaskForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}
