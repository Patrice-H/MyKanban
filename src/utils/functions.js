const convertTasksList = (list) => {
  let tasks = {};
  list.sort((a, b) => a.order - b.order);
  list.forEach((task) => {
    tasks = {
      ...tasks,
      [`task-${task.id}`]: {
        id: `task-${task.id}`,
        title: task.title,
      },
    };
  });

  return tasks;
};

const convertColumnsList = (columnsList, tasksList) => {
  let columns = {};
  for (let i = 0; i < columnsList.length; i++) {
    let columnName = `column-${i + 1}`;
    const taskIds = Object.keys(
      convertTasksList(
        tasksList.filter((task) => task.category_id === columnsList[i].id)
      )
    );
    columns[columnName] = {
      id: columnName,
      title: columnsList[i].title,
      taskIds: taskIds,
      backgroundColor: columnsList[i].background_color,
    };
  }

  return columns;
};

const getColumnOrder = (list) => {
  let columnOrder = [];
  list.sort((a, b) => a.order - b.order);
  for (let i = 0; i < list.length; i++) {
    columnOrder.push(`column-${i + 1}`);
  }

  return columnOrder;
};

export const getCategoryId = (columnName, categories) => {
  let category = categories.find(
    (category) => category.id === parseInt(columnName.split('column-')[1])
  );

  return category.id;
};

export const getInitialDashboard = (categories, dbList, initialData) => {
  const tasks = convertTasksList(dbList);
  const columnOrder = getColumnOrder(categories);
  const columns = convertColumnsList(categories, dbList);

  return {
    ...initialData,
    tasks,
    columns,
    columnOrder,
  };
};

export const closeDashboardModal = () => {
  const modal = document.getElementById('dashboard-modal');
  modal.classList.add('hidden');
};
