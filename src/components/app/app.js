import React, {Component} from "react";
import NewTaskForm from "../new-task-form";
import TaskList from "../task-list";
import Footer from "../footer";
import "./app.css";

export default class App extends Component {

  maxId = 9

  state = {
    tasks: [],
    filterName: "All"
  };

  _getTaskIndex = (id) => {
    return this.state.tasks.findIndex((el) => el.id === id);
  }

  _getTaskToBeChanged = (id) => {
    let idx = this._getTaskIndex(id);
    return this.state.tasks[idx];
  }

  _createTask = (text) => {
    return {
      text,
      creationTime: new Date(),
      completed: false,
      toBeEdited: false,
      id: this.maxId++
    }
  }

  _changeProp = (id, newTask) => {
    this.setState(({tasks}) => {
      let idx = this._getTaskIndex(id);
      let newArray = [
        ...tasks.slice(0, idx),
        newTask,
        ...tasks.slice(idx + 1)
      ];
      return { tasks: newArray }
    });
  }

  addTask = (text) => {
    if (!text.trim()) {return}
    this.setState(({tasks}) => {
      const newTask = this._createTask(text);
      const newArray = [
        ...tasks.slice(),
        newTask
      ];
      return { tasks: newArray }
    });
  }

  removeTask = (id) => {
    this.setState(({tasks}) => {
      let idx = this._getTaskIndex(id);
      const newArray = [
        ...tasks.slice(0, idx),
        ...tasks.slice(idx + 1)
      ]
      return { tasks: newArray }
    });
  }

  changePropCompleted = (id) => {
    const oldTask = this._getTaskToBeChanged(id);
    this._changeProp(id, {...oldTask, completed: !oldTask.completed});
  }

  changePropToBeEdited = (id) => {
    const oldTask = this._getTaskToBeChanged(id);
    this._changeProp(id, {...oldTask, toBeEdited: !oldTask.toBeEdited});
  }

  changePropText = (id, text) => {
    if (!text.trim()) {return}
    const oldTask = this._getTaskToBeChanged(id);
    this._changeProp(id, {...oldTask, text: text, toBeEdited: !oldTask.toBeEdited});
  }

  filterTasks = (filterName) => {
    if (this.state.filterName === filterName) {
      return;
    }
    this.setState(() => ({filterName: filterName}));
  }

  delCompletedTasks = () => {
    this.setState(({tasks}) => {
      const newArray = tasks.filter((task) => !task.completed)
      return {
        tasks: newArray
      }
    })
  }

  getCountActiveTasks = () => {
    return this.state.tasks.filter((task) => task.completed === false).length
  }

  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm
            onSubmit={(text) => this.addTask(text)}
          />
        </header>
        <section className="main">
          <TaskList
            todos={this.state.tasks}
            currentFilter={this.state.filterName}
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
