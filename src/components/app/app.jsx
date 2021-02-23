import React from 'react';
import NewTaskForm from '../new-task-form/index';
import useCreate from './app-logic/useCreate';
import useFilter from './app-logic/useFilter';
import useGetCountActive from './app-logic/useGetCountActive';
import useDelete from './app-logic/useDelete';
import useUpdate from './app-logic/useUpdate';
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
        <NewTaskForm onSubmit={(text, min, sec) => addTask(text, min, sec)} />
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
