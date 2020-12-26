import React, {Component} from "react";
import "./tasks-filter.css";

export default class TasksFilter extends Component {

  state = {
    filterName: 'All'
  }

  onButtonClick = (e) => {
    this.setState(() => {
      this.props.onFilter(e.target.name);
      return {
        filterName: e.target.name
      }
    })
  }

  render() {
    return (
      <ul className="filters">
        <li>
          <button
            onClick={this.onButtonClick}
            name="All"
            className={(this.state.filterName === "All") ? "selected" : null}
          >All</button>
        </li>
        <li>
          <button
            onClick={this.onButtonClick}
            name="Active"
            className={(this.state.filterName === "Active") ? "selected" : null}
          >Active</button>
        </li>
        <li>
          <button
            onClick={this.onButtonClick}
            name="Completed"
            className={(this.state.filterName === "Completed") ? "selected" : null}
          >Completed</button>
        </li>
      </ul>
    )
  };
};


