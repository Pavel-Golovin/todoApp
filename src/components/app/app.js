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
      creationTime: new Date(),
      isCompleted: false,
      isEditing: false,
      id: this.maxId++
    }
  }

  state = {
    todoData: [],
    filterName: "All"
  };

  getCountActiveTasks = () => {
    return this.state.todoData.filter((task) => task.isCompleted === false).length
  }

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

  deleteAllCompletedTasks = () => {
    this.setState(({todoData}) => {
      const newArray = todoData.filter((task) => !task.isCompleted)
      return {
        todoData: newArray
      }
    })
  }

  addTask = (text) => {
    this.setState(({todoData}) => {
      const newTask = this.createTask(text);
      const newArray = [
        ...todoData.slice(),
        newTask
      ];
      return { todoData: newArray }
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

  editTask = (id, text) => {
    this.setState(({todoData}) => {
      let idx = todoData.findIndex((el) => el.id === id);
      const oldTask = todoData[idx];
      const newTask = {...oldTask, text: text, isEditing: !oldTask.isEditing};
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

  toggleEditingRegime = (id) => {
    this.setState(({todoData}) => {
      let idx = todoData.findIndex((el) => el.id === id);
      const oldTask = todoData[idx];
      const newTask = {...oldTask, isEditing: !oldTask.isEditing};
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



  changeFilter = (filterName) => {
    if (this.state.filterName === filterName) {
      return;
    }
    this.setState(() => ({filterName: filterName}));
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
            onCompleted={this.completeTask}
            onDestroyed={this.deleteTask}
            onEditing={this.toggleEditingRegime}
            onEditTask={this.editTask}
          />
          <Footer
            onFilter={this.changeFilter}
            onClear={this.deleteAllCompletedTasks}
            activeTasksCounter={this.getCountActiveTasks}
          />
        </section>
      </section>
    );
  }
}
