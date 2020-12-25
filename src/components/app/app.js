import React, {Component} from "react";
import NewTaskForm from "../new-task-form";
import TaskList from "../task-list";
import Footer from "../footer";
import "./app.css";

export default class App extends Component {

  maxId = 9

  createTask = (text, creationTime) => {
    return {
      text,
      creationTime,
      isCompleted: false,
      id: this.maxId++
    }
  }

  state = {
    todoData: [
      this.createTask("Completed task", "created 17 seconds ago"),
      this.createTask("Completed task", "created 5 minutes ago"),
      this.createTask("Completed task", "created 5 minutes ago"),
    ],
  };

  completeTask = (id) => {
    console.log(id)
  }

  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm/>
        </header>
        <section className="main">
          <TaskList
            todos={this.state.todoData}
            onCompleted={this.completeTask}
          />
          <Footer/>
        </section>
      </section>
    );
  }
}

