import React from "react";
import PropTypes from "prop-types";
import TasksFilter from "../tasks-filter";
import "./footer.css";

const Footer = (props) => {

  return (
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

};

Footer.defaultProps = {
  activeTasksCounter: () => {},
  onFilter: () => {},
  onClear: () => {}
}

Footer.propTypes = {
  activeTasksCounter: PropTypes.func,
  onFilter: PropTypes.func,
  onClear: PropTypes.func
}

export default Footer;
