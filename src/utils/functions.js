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

export const getColumnName = (column) => {
  switch (column) {
    case 'column-1':
      return 'to do';
    case 'column-2':
      return 'in progress';
    case 'column-3':
      return 'done';
    default:
      break;
  }
};
