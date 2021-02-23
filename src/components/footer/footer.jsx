import React from 'react';
import PropTypes from 'prop-types';
import TasksFilter from '../tasks-filter/index';
import './footer.css';

const Footer = (props) => {
  const { activeTasksCount, onClear } = props;

  return (
    <footer className="footer">
      <span className="todo-count">{activeTasksCount} items left</span>
      <TasksFilter onFilter={(filterName) => props.onFilter(filterName)} />
      <button type="button" className="clear-completed" onClick={onClear}>
        Clear completed
      </button>
    </footer>
  );
};

Footer.defaultProps = {
  activeTasksCount: 0,
};

Footer.propTypes = {
  activeTasksCount: PropTypes.string,
  onFilter: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
};

export default Footer;
