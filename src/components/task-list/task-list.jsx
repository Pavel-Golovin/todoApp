import React from 'react';
import PropTypes from 'prop-types';
import Task from '../task/index';
import './task-list.css';

const TaskList = (props) => {
  /* eslint-disable */

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

  const elements = props.todos.map(({ toBeEdited, completed, creationTime, id, text, min, sec }) => {
    const classValue = classControl(completed, toBeEdited);

    return (
      <li className={classValue} key={id}>
        <Task
          text={text}
          minutes={min}
          seconds={sec}
          creationTime={creationTime}
          onCompleted={() => props.onCompleted(id)}
          onDestroyed={() => props.onDestroyed(id)}
          onEditing={() => props.onEditing(id)}
          onEditTask={(newText) => props.onEditTask(id, newText)}
          classname={classValue}
        />
      </li>
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
