const useGetCountActive = (tasks) => {
  const getActiveTasksCount = () => tasks.filter((task) => task.completed === false).length;

  const activeTasksCount = getActiveTasksCount();

  return [activeTasksCount];
};

export default useGetCountActive;
