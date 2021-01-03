import React from "react";
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

export default Footer;
