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

const convertColumnsList = (list) => {
  let columns = {};
  for (let i = 0; i < list.categories.length; i++) {
    let columnName = `column-${i + 1}`;
    const taskIds = Object.keys(
      convertTasksList(
        list.tasks.filter((task) => task.category_id === list.categories[i].id)
      )
    );
    columns[columnName] = {
      id: columnName,
      title: list.categories[i].title,
      taskIds: taskIds,
      backgroundColor: list.categories[i].background_color,
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
    (category) => category.order === parseInt(columnName.split('column-')[1])
  );

  return category.id;
};

export const getInitialDashboard = (list, initialData) => {
  const tasks = convertTasksList(list.tasks);
  const columnOrder = getColumnOrder(list.categories);
  const columns = convertColumnsList(list);

  return {
    ...initialData,
    tasks,
    columns,
    columnOrder,
  };
};

export const closeModal = (modalId) => {
  const modal = document.getElementById(modalId);
  modal.classList.add('hidden-modal');
};

export const openModal = (modalId) => {
  const modal = document.getElementById(modalId);
  modal.classList.remove('hidden-modal');
};

export const convertColor = (rgbaColor) => {
  const colorParams = rgbaColor.split('rgba(')[1].split(')')[0].split(', ');

  return {
    r: colorParams[0],
    g: colorParams[1],
    b: colorParams[2],
    a: colorParams[3],
  };
};
