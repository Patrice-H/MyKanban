/**
 * Function to convert all tasks list into an object
 *
 * @description It takes a list of tasks, sorts them by order, and then returns an object with all tasks
 * @param {[object]} list
 * @returns {object} tasks
 */
const convertTasksList = (list) => {
  let tasks = {};
  list.sort((a, b) => a.order - b.order);
  list.forEach((task) => {
    tasks = {
      ...tasks,
      [`task-${task.id}`]: {
        id: `task-${task.id}`,
        title: task.title,
        description: task.description,
      },
    };
  });

  return tasks;
};

/**
 * Function to convert all categories list into an object
 *
 * @description It takes a list of categories and tasks, and returns a list of columns with the tasks in each
 * column.
 * @param {[object]} list
 * @returns {object} columns
 */
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

/**
 * Function to order a list of columns
 *
 * @description It takes a list of objects, sorts them by their order property, and returns an array of strings that
 * are the names of the columns.
 * @param {[object]} list - the list of columns
 * @returns {[string]} An array of strings.
 */
const getColumnOrder = (list) => {
  let columnOrder = [];
  list.sort((a, b) => a.order - b.order);
  for (let i = 0; i < list.length; i++) {
    columnOrder.push(`column-${i + 1}`);
  }

  return columnOrder;
};

/**
 * Function to get the category id
 *
 * @description It takes a column name and a list of categories and returns the id of the category that matches the
 * column name.
 * @param {string} columnName - "e.g: `column-1`"
 * @param {[object]} categories - "[e.g: `{id: 1, order: 1}, {id: 2, order: 2}, {id: 3, order: 3}`]"
 * @returns {number} The category id
 */
export const getCategoryId = (columnName, categories) => {
  let category = categories.find(
    (category) => category.order === parseInt(columnName.split('column-')[1])
  );

  return category.id;
};

/**
 * Function to get initial dashboard
 *
 * @description It takes a list of tasks and categories, and returns a dashboard object with the tasks, columns, and
 * column order.
 * @see {@link convertTasksList}
 * @see {@link getColumnOrder}
 * @see {@link convertColumnsList}
 * @param {object} list
 * @param {object} initialData
 * @returns {object}
 */
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

/**
 * Function to close a modal window
 *
 * @description It takes a modal id as an argument, finds the modal with that id, and adds the class 'hidden-modal'
 * to it.
 * @param {string} modalId - The id of the modal you want to close.
 */
export const closeModal = (modalId) => {
  const modal = document.getElementById(modalId);
  modal.classList.add('hidden-modal');
};

/**
 * Function to open a modal window
 *
 * @description It takes a modal id as an argument, finds the modal with that id, and removes the hidden-modal class
 * from it.
 * @param {string} modalId - The id of the modal you want to open.
 */
export const openModal = (modalId) => {
  const modal = document.getElementById(modalId);
  modal.classList.remove('hidden-modal');
};

/**
 * Function to convert a color
 *
 * @description It takes a string in the format of `rgba(r, g, b, a)` and returns an object with the values of `r`,
 * `g`, `b`, and `a` as properties.
 * @param {string} rgbaColor - The color you want to convert.
 * @returns {object} An object with the properties r, g, b, and a.
 */
export const convertColor = (rgbaColor) => {
  const colorParams = rgbaColor.split('rgba(')[1].split(')')[0].split(', ');

  return {
    r: colorParams[0],
    g: colorParams[1],
    b: colorParams[2],
    a: colorParams[3],
  };
};
