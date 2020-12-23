import React from 'react';
import Task from './task';
import './task-list.css'

const TaskList = () => {
  return (
    <ul className="todo-list">
      <Task className="completed" content="Completed task" creationTime="created 17 seconds ago"/>
      <Task className="editing" content="Editing task" creationTime="created 5 minutes ago"/>
      <Task content="Active task" creationTime="created 5 minutes ago"/>
    </ul>
  );
};

export default TaskList;
