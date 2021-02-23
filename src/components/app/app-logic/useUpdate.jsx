const useUpdate = (tasks, updateTasks) => {
  const getTaskIndex = (id) => tasks.findIndex((el) => el.id === id); // useUpdate

  const getTaskToBeChanged = (id) => {
    // useUpdate
    const idx = getTaskIndex(id);
    return tasks[idx];
  };

  const changeProp = (id, newTask) => {
    // useUpdate
    const idx = getTaskIndex(id);
    const newArray = [...tasks.slice(0, idx), newTask, ...tasks.slice(idx + 1)];
    updateTasks(newArray);
  };

  const changePropCompleted = (id) => {
    // useUpdate
    const oldTask = getTaskToBeChanged(id);
    changeProp(id, { ...oldTask, completed: !oldTask.completed });
  };

  const changePropToBeEdited = (id) => {
    // useUpdate
    const oldTask = getTaskToBeChanged(id);
    changeProp(id, { ...oldTask, toBeEdited: !oldTask.toBeEdited });
  };

  const changePropText = (id, text) => {
    // useUpdate
    if (!text.trim()) {
      return;
    }
    const oldTask = getTaskToBeChanged(id);
    changeProp(id, { ...oldTask, text, toBeEdited: !oldTask.toBeEdited });
  };

  return [changePropCompleted, changePropToBeEdited, changePropText];
};

export default useUpdate;
