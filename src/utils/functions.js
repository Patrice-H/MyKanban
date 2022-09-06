export const convertTasksList = (list) => {
  let tasks = {};
  list.forEach((task) => {
    tasks = {
      ...tasks,
      [`task-${task.id}`]: {
        id: `task-${task.id}`,
        title: task.name,
      },
    };
  });

  return tasks;
};
