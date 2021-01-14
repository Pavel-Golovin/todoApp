import React from "react";
import PropTypes from "prop-types";
import TasksFilter from "../tasks-filter";
import "./footer.css";

const Footer = (props) => (
    <footer className="footer">
      <span className="todo-count">{props.activeTasksCounter()} items left</span>
      <TasksFilter
        onFilter={(filterName) => props.onFilter(filterName) }
      />
      <button
        className="clear-completed"
        onClick={props.onClear}
      >Clear completed</button>
    </footer>
  );

Footer.defaultProps = {
  activeTasksCounter: () => {}
}

Footer.propTypes = {
  activeTasksCounter: PropTypes.func,
  onFilter: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired
}

export default Footer;
