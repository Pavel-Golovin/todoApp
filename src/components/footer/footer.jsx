import React from "react";
import PropTypes from "prop-types";
import TasksFilter from "../tasks-filter/index";
import "./footer.css";

const Footer = (props) => {
  
  const {activeTasksCounter, onClear} = props;
  
  return (
    <footer className="footer">
      <span className="todo-count">{activeTasksCounter()} items left</span>
      <TasksFilter
        onFilter={(filterName) => props.onFilter(filterName) }
      />
      <button
        type="button"
        className="clear-completed"
        onClick={onClear}
      >Clear completed</button>
    </footer>
  );
}

Footer.defaultProps = {
  activeTasksCounter: () => {}
}

Footer.propTypes = {
  activeTasksCounter: PropTypes.func,
  onFilter: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired
}

export default Footer;
