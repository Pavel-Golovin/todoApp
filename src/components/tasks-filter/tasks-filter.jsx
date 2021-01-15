import React, {Component} from "react";
import PropTypes from "prop-types";
import "./tasks-filter.css";

export default class TasksFilter extends Component {

  static defaultProps = {
    onFilter: () => {}
  }

  static propTypes = {
    onFilter: PropTypes.func
  }

  state = {
    filterName: 'All'
  }

  onButtonClick = (evt) => {
    const {onFilter} = this.props;
    this.setState(() => {
      onFilter(evt.target.name);
      return {
        filterName: evt.target.name
      }
    })
  }

  render() {
    
    const {filterName} = this.state;
    
    return (
      <ul className="filters">
        <li>
          <button
            type="button"
            onClick={this.onButtonClick}
            name="All"
            className={(filterName === "All") ? "selected" : null}
          >All</button>
        </li>
        <li>
          <button
            type="button"
            onClick={this.onButtonClick}
            name="Active"
            className={(filterName === "Active") ? "selected" : null}
          >Active</button>
        </li>
        <li>
          <button
            type="button"
            onClick={this.onButtonClick}
            name="Completed"
            className={(filterName === "Completed") ? "selected" : null}
          >Completed</button>
        </li>
      </ul>
    )
  };
};
