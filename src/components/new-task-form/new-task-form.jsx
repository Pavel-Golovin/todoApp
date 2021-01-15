import  React, {Component} from "react";
import  PropTypes from "prop-types";
import "./new-task-form.css";

export default class NewTaskForm extends Component {

  state = {
    value: ''
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    const {onSubmit} = this.props;
    const {value} = this.state;
    onSubmit(value);
    this.setState(() => ({
        value: ''
      }))
  }

  onInputChange = (e) => {
    this.setState(() => ({
        value: e.target.value
      }))
  }

  render() {
    
    const {value} = this.state;

    return (
      <form onSubmit={this.onFormSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={this.onInputChange}
          value={value}
        />
      </form>
    );
  };
};

NewTaskForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}
