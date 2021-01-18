import React from 'react';
import PropTypes from 'prop-types';
import Task from '../task/index';
import './task-list.css';

const TaskList = (props) => {
  const getTodosToBeShown = () => {
    const { todos, currentFilter } = props;
    switch (currentFilter) {
      case 'Completed':
        return todos.filter((todo) => todo.completed === true);
      case 'Active':
        return todos.filter((todo) => todo.completed === false);
      case 'All':
        return todos;
      default:
        return todos;
    }
  };

  const classControl = (isCompleted, isToBeEdited) => {
    let className = null;

    if (isCompleted) {
      className = 'completed';
    }
    if (isToBeEdited) {
      className = 'editing';
    }
    return className;
  };

  const elements = getTodosToBeShown().map(({ toBeEdited, completed, creationTime, id, text }) => {
    const classValue = classControl(completed, toBeEdited);

    return (
      <li className={classValue} key={id}>
        <Task
          text={text}
          creationTime={creationTime}
          onCompleted={() => props.onCompleted(id)}
          onDestroyed={() => props.onDestroyed(id)}
          onEditing={() => props.onEditing(id)}
          onEditTask={(newText) => props.onEditTask(id, newText)}
          className={classValue}
        />
      </li>
    );
  });

  return <ul className="todo-list"> {elements} </ul>;
};

TaskList.defaultProps = {
  currentFilter: 'All',
  onCompleted: () => {},
  onDestroyed: () => {},
};

TaskList.propTypes = {
  currentFilter: PropTypes.string,
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  onCompleted: PropTypes.func,
  onDestroyed: PropTypes.func,
  onEditing: PropTypes.func.isRequired,
  onEditTask: PropTypes.func.isRequired,
};

export default TaskList;
