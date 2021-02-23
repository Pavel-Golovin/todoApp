import { useState } from 'react';

const useFilter = (tasks) => {
  const [filterName, changeFilterName] = useState('All');

  const filterTasks = (newFilterName) => {
    if (newFilterName === filterName) {
      return;
    }
    changeFilterName(newFilterName);
  };

  const getFilteredTasks = () => {
    switch (filterName) {
      case 'Completed':
        return tasks.filter((todo) => todo.completed);
      case 'Active':
        return tasks.filter((todo) => !todo.completed);
      case 'All':
        return tasks;
      default:
        return tasks;
    }
  };

  const filteredTasks = getFilteredTasks();

  return [filteredTasks, filterTasks];
};

export default useFilter;
