import React, {Component} from "react";
import NewTaskForm from "../new-task-form";
import TaskList from "../task-list";
import Footer from "../footer";
import "./app.css";

export default class App extends Component {

  maxId = 9

  state = {
    todoData: [],
    filterName: "All"
  };

  _getTaskIndex = (id) => {
    return this.state.todoData.findIndex((el) => el.id === id);
  }

  _getTaskToBeChanged = (id) => {
    let idx = this._getTaskIndex(id);
    return this.state.todoData[idx];
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
    this.setState(({todoData}) => {
      let idx = this._getTaskIndex(id);
      let newArray = [
        ...todoData.slice(0, idx),
        newTask,
        ...todoData.slice(idx + 1)
      ];
      return { todoData: newArray }
    });
  }

  addTask = (text) => {
    this.setState(({todoData}) => {
      const newTask = this._createTask(text);
      const newArray = [
        ...todoData.slice(),
        newTask
      ];
      return { todoData: newArray }
    });
  }

  removeTask = (id) => {
    this.setState(({todoData}) => {
      let idx = this._getTaskIndex(id);
      const newArray = [
        ...todoData.slice(0, idx),
        ...todoData.slice(idx + 1)
      ]
      return {
        todoData: newArray
      }
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
    this.setState(({todoData}) => {
      const newArray = todoData.filter((task) => !task.completed)
      return {
        todoData: newArray
      }
    })
  }

  getCountActiveTasks = () => {
    return this.state.todoData.filter((task) => task.completed === false).length
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
            todos={this.state.todoData}
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
