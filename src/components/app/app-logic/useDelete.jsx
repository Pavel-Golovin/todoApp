const useDelete = (tasks, updateTasks) => {
  const removeTask = (id) => {
    const idx = tasks.findIndex((el) => el.id === id);
    const newArray = [...tasks.slice(0, idx), ...tasks.slice(idx + 1)];
    updateTasks(newArray);
  };

  const delCompletedTasks = () => {
    const newArray = tasks.filter((task) => !task.completed);
    updateTasks(newArray);
  };

  return [removeTask, delCompletedTasks];
};

export default useDelete;
