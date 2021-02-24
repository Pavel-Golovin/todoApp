import React from 'react';
import PropTypes from 'prop-types';
import useFilter from './tasks-filter-logic/index';
import './tasks-filter.css';

const TasksFilter = ({ onFilter }) => {
  const [filterName, onButtonClick] = useFilter(onFilter);

  return (
    <ul className="filters">
      <li>
        <button type="button" onClick={onButtonClick} name="All" className={filterName === 'All' ? 'selected' : null}>
          All
        </button>
      </li>
      <li>
        <button
          type="button"
          onClick={onButtonClick}
          name="Active"
          className={filterName === 'Active' ? 'selected' : null}
        >
          Active
        </button>
      </li>
      <li>
        <button
          type="button"
          onClick={onButtonClick}
          name="Completed"
          className={filterName === 'Completed' ? 'selected' : null}
        >
          Completed
        </button>
      </li>
    </ul>
  );
};

TasksFilter.defaultProps = {
  onFilter: () => {},
};

TasksFilter.propTypes = {
  onFilter: PropTypes.func,
};

export default TasksFilter;
