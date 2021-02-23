import { useState } from 'react';

const useCreate = () => {
  const [tasks, updateTasks] = useState([]);
  const [maxId, updateMaxId] = useState(9);

  const createTask = (text, min, sec) => {
    const newTask = {
      text,
      min,
      sec,
      creationTime: new Date(),
      completed: false,
      toBeEdited: false,
      id: maxId,
    };
    updateMaxId((prev) => prev + 1);
    return newTask;
  };

  const addTask = (text, min, sec) => {
    if (!text.trim()) {
      return;
    }
    const newTask = createTask(text, min, sec);
    const newArray = [...tasks.slice(), newTask];
    updateTasks(newArray);
  };

  return [tasks, updateTasks, addTask];
};

export default useCreate;
