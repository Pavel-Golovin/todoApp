import React, { useState } from 'react';
import NewTaskForm from '../new-task-form/index';
import TaskList from '../task-list/index';
import Footer from '../footer/index';
import './app.css';

const App = () => {
  const [tasks, updateTasks] = useState([]);
  const [filterName, changeFilterName] = useState('All');
  const [maxId, updateMaxId] = useState(9);

  const getTaskIndex = (id) => tasks.findIndex((el) => el.id === id);

  const getTaskToBeChanged = (id) => {
    const idx = getTaskIndex(id);
    return tasks[idx];
  };

  const createTask = (text, min, sec) => {
    const newTask = {
      text,
      min,
      sec,
      creationTime: new Date(),
      completed: false,
      toBeEdited: false,
      id: maxId,
    };
    updateMaxId((prev) => prev + 1);
    return newTask;
  };

  const changeProp = (id, newTask) => {
    const idx = getTaskIndex(id);
    const newArray = [...tasks.slice(0, idx), newTask, ...tasks.slice(idx + 1)];
    updateTasks(newArray);
  };

  const addTask = (text, min, sec) => {
    if (!text.trim()) {
      return;
    }
    const newTask = createTask(text, min, sec);
    const newArray = [...tasks.slice(), newTask];
    updateTasks(newArray);
  };

  const removeTask = (id) => {
    const idx = getTaskIndex(id);
    const newArray = [...tasks.slice(0, idx), ...tasks.slice(idx + 1)];
    updateTasks(newArray);
  };

  const changePropCompleted = (id) => {
    const oldTask = getTaskToBeChanged(id);
    changeProp(id, { ...oldTask, completed: !oldTask.completed });
  };

  const changePropToBeEdited = (id) => {
    const oldTask = getTaskToBeChanged(id);
    changeProp(id, { ...oldTask, toBeEdited: !oldTask.toBeEdited });
  };

  const changePropText = (id, text) => {
    if (!text.trim()) {
      return;
    }
    const oldTask = getTaskToBeChanged(id);
    changeProp(id, { ...oldTask, text, toBeEdited: !oldTask.toBeEdited });
  };

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

  const delCompletedTasks = () => {
    const newArray = tasks.filter((task) => !task.completed);
    updateTasks(newArray);
  };

  const getCountActiveTasks = () => tasks.filter((task) => task.completed === false).length;

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm onSubmit={(text, min, sec) => addTask(text, min, sec)} />
      </header>
      <section className="main">
        <TaskList
          todos={getFilteredTasks()}
          onDestroyed={removeTask}
          onCompleted={changePropCompleted}
          onEditing={changePropToBeEdited}
          onEditTask={changePropText}
        />
        <Footer onFilter={filterTasks} onClear={delCompletedTasks} activeTasksCounter={getCountActiveTasks} />
      </section>
    </section>
  );
};

export default App;
