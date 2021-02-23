import React from 'react';
import { useCreate, useFilter, useGetCountActive, useDelete, useUpdate } from './app-logic/index';
import TaskForm from '../task-form/index';
import TaskList from '../task-list/index';
import Footer from '../footer/index';
import './app.css';

const App = () => {
  const [tasks, updateTasks, addTask] = useCreate();
  const [filteredTasks, filterTasks] = useFilter(tasks);
  const [activeTasksCount] = useGetCountActive(tasks);
  const [removeTask, delCompletedTasks] = useDelete(tasks, updateTasks);
  const [changePropCompleted, changePropToBeEdited, changePropText] = useUpdate(tasks, updateTasks);

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <TaskForm onSubmit={(text, min, sec) => addTask(text, min, sec)} />
      </header>
      <section className="main">
        <TaskList
          todos={filteredTasks}
          onDestroyed={removeTask}
          onCompleted={changePropCompleted}
          onEditing={changePropToBeEdited}
          onEditTask={changePropText}
        />
        <Footer onFilter={filterTasks} onClear={delCompletedTasks} activeTasksCount={activeTasksCount} />
      </section>
    </section>
  );
};

export default App;
