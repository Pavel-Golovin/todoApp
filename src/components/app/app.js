import React, {Component} from "react";
import NewTaskForm from "../new-task-form";
import TaskList from "../task-list";
import Footer from "../footer";
import "./app.css";

export default class App extends Component {

  maxId = 9

  createTask = (text) => {
    return {
      text,
      creationTime: "created 5 minutes ago",
      isCompleted: false,
      id: this.maxId++
    }
  }

  state = {
    todoData: [
      this.createTask("Completed task"),
      this.createTask("Completed task"),
      this.createTask("Completed task"),
    ],
  };

  deleteTask = (id) => {
    this.setState(({todoData}) => {
      let idx = todoData.findIndex((el) => el.id === id);
      const newArray = [
        ...todoData.slice(0, idx),
        ...todoData.slice(idx + 1)
      ]
      return {
        todoData: newArray
      }
    });
  }

  addTask = (text) => {
    this.setState(({todoData}) => {
      const newTask = this.createTask(text);
      const newArray = [
        ...todoData.slice(),
        newTask
      ];

      return {
        todoData: newArray
      }
    });
  }

  completeTask = (id) => {
    this.setState(({todoData}) => {
      let idx = todoData.findIndex((el) => el.id === id);
      const oldTask = todoData[idx];
      const newTask = {...oldTask, isCompleted: !oldTask.isCompleted};

      let newArray = [
        ...todoData.slice(0, idx),
        newTask,
        ...todoData.slice(idx + 1)
      ];

      return {
        todoData: newArray
      }
    });
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
            onCompleted={this.completeTask}
            onDestroyed={this.deleteTask}
          />
          <Footer/>
        </section>
      </section>
    );
  }
}
