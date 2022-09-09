export const convertTasksList = (list) => {
  let tasks = {};
  list.sort((a, b) => a.order - b.order);
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

export const getInitialDashboard = (dbList, initialData) => {
  const tasks = convertTasksList(dbList);
  const taskIds1 = convertTasksList(
    dbList.filter((item) => item.category === 'to do')
  );
  const taskIds2 = convertTasksList(
    dbList.filter((item) => item.category === 'in progress')
  );
  const taskIds3 = convertTasksList(
    dbList.filter((item) => item.category === 'done')
  );
  const columns = {
    ...initialData.columns,
    'column-1': {
      ...initialData.columns['column-1'],
      taskIds: Object.keys(taskIds1),
    },
    'column-2': {
      ...initialData.columns['column-2'],
      taskIds: Object.keys(taskIds2),
    },
    'column-3': {
      ...initialData.columns['column-3'],
      taskIds: Object.keys(taskIds3),
    },
  };

  return {
    ...initialData,
    columns,
    tasks,
  };
};
