import React, { Component } from 'react';
import NewTaskForm from '../new-task-form/index';
import TaskList from '../task-list/index';
import Footer from '../footer/index';
import './app.css';

export default class App extends Component {
  maxId = 9;

  state = {
    tasks: [],
    filterName: 'All',
  };

  getTaskIndex = (id) => {
    const { tasks } = this.state;
    return tasks.findIndex((el) => el.id === id);
  };

  getTaskToBeChanged = (id) => {
    const idx = this.getTaskIndex(id);
    const { tasks } = this.state;
    return tasks[idx];
  };

  createTask = (text, min, sec) => ({
    text,
    min,
    sec,
    creationTime: new Date(),
    completed: false,
    toBeEdited: false,
    id: this.maxId++, // eslint-disable-line no-plusplus
  });

  changeProp = (id, newTask) => {
    this.setState(({ tasks }) => {
      const idx = this.getTaskIndex(id);
      const newArray = [...tasks.slice(0, idx), newTask, ...tasks.slice(idx + 1)];
      return { tasks: newArray };
    });
  };

  addTask = (text, min, sec) => {
    if (!text.trim()) {
      return;
    }
    this.setState(({ tasks }) => {
      const newTask = this.createTask(text, min, sec);
      const newArray = [...tasks.slice(), newTask];
      return { tasks: newArray };
    });
  };

  removeTask = (id) => {
    this.setState(({ tasks }) => {
      const idx = this.getTaskIndex(id);
      const newArray = [...tasks.slice(0, idx), ...tasks.slice(idx + 1)];
      return { tasks: newArray };
    });
  };

  changePropCompleted = (id) => {
    const oldTask = this.getTaskToBeChanged(id);
    this.changeProp(id, { ...oldTask, completed: !oldTask.completed });
  };

  changePropToBeEdited = (id) => {
    const oldTask = this.getTaskToBeChanged(id);
    this.changeProp(id, { ...oldTask, toBeEdited: !oldTask.toBeEdited });
  };

  changePropText = (id, text) => {
    if (!text.trim()) {
      return;
    }
    const oldTask = this.getTaskToBeChanged(id);
    this.changeProp(id, { ...oldTask, text, toBeEdited: !oldTask.toBeEdited });
  };

  filterTasks = (newFilterName) => {
    const { filterName } = this.state;
    if (newFilterName === filterName) {
      return;
    }
    this.setState(() => ({ filterName: newFilterName }));
  };

  getFilteredTasks = () => {
    const { tasks, filterName } = this.state;
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

  delCompletedTasks = () => {
    this.setState(({ tasks }) => {
      const newArray = tasks.filter((task) => !task.completed);
      return {
        tasks: newArray,
      };
    });
  };

  getCountActiveTasks = () => {
    const { tasks } = this.state;
    return tasks.filter((task) => task.completed === false).length;
  };

  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onSubmit={(text, min, sec) => this.addTask(text, min, sec)} />
        </header>
        <section className="main">
          <TaskList
            todos={this.getFilteredTasks()}
            onDestroyed={this.removeTask}
            onCompleted={this.changePropCompleted}
            onEditing={this.changePropToBeEdited}
            onEditTask={this.changePropText}
          />
          <Footer
            onFilter={this.filterTasks}
            onClear={this.delCompletedTasks}
            activeTasksCounter={this.getCountActiveTasks}
          />
        </section>
      </section>
    );
  }
}
