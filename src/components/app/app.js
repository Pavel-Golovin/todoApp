import React, {Component} from "react";
import NewTaskForm from "../new-task-form";
import TaskList from "../task-list";
import Footer from "../footer";
import "./app.css";

export default class App extends Component {

    state = {
      todoData: [
        {className: "completed", label: "Completed task", creationTime: "created 17 seconds ago", id: 1},
        {className: "editing", label: "Editing task", creationTime: "created 5 minutes ago", id: 2},
        {className: null, label: "Active task", creationTime: "created 5 minutes ago", id: 3}
      ],
    };

    render() {
        return (
            <section className="todoapp">
                <header className="header">
                    <h1>todos</h1>
                    <NewTaskForm/>
                </header>
                <section className="main">
                    <TaskList todos={this.state.todoData}/>
                    <Footer/>
                </section>
            </section>
        );
    }
}

