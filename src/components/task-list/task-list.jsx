import React from 'react';
import PropTypes from 'prop-types';
import Task from '../task/index';
import './task-list.css';

const TaskList = ({ todos, onCompleted, onDestroyed, onEditing, onEditTask }) => {
  const elements = todos.map((task) => {
    const { id } = task;

    return (
      <Task
        {...task}
        key={id}
        onCompleted={() => onCompleted(id)}
        onDestroyed={() => onDestroyed(id)}
        onEditing={() => onEditing(id)}
        onEditTask={(newText) => onEditTask(id, newText)}
      />
    );
  });

  return <ul className="todo-list"> {elements} </ul>;
};

TaskList.defaultProps = {
  onCompleted: () => {},
  onDestroyed: () => {},
};

TaskList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  onCompleted: PropTypes.func,
  onDestroyed: PropTypes.func,
  onEditing: PropTypes.func.isRequired,
  onEditTask: PropTypes.func.isRequired,
};

export default TaskList;
