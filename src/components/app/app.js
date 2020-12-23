import React from "react";
import NewTaskForm from "../new-task-form";
import TaskList from "../task-list";
import Footer from "../footer";
import "./app.css";

const App = () => {

  const todoData = [
    {  className: "completed", label: "Completed task", creationTime: "created 17 seconds ago" },
    {  className: "editing", label: "Editing task", creationTime: "created 5 minutes ago" },
    {  className: null, label: "Active task", creationTime: "created 5 minutes ago" }
  ];

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm />
      </header>
      <section className="main">
        <TaskList todos={todoData}/>
        <Footer />
      </section>
    </section>
  );
};

export default App;
