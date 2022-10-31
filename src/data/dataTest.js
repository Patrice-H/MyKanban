const categories = [
  {
    id: 3,
    title: 'column-test 1',
    order: 1,
    background_color: 'rgba(255, 0, 0, 0.25)',
  },
  {
    id: 2,
    title: 'column-test 2',
    order: 2,
    background_color: 'rgba(255, 255, 0, 0.25)',
  },
  {
    id: 1,
    title: 'column-test 3',
    order: 3,
    background_color: 'rgba(0, 255, 0, 0.25)',
  },
];

const tasks = [
  {
    id: 1,
    title: 'task-test 1',
    description: 'description of task-test 1',
    order: 1,
    category_id: 1,
  },
  {
    id: 2,
    title: 'task-test 2',
    description: 'description of task-test 2',
    order: 2,
    category_id: 1,
  },
  {
    id: 3,
    title: 'task-test 3',
    description: 'description of task-test 3',
    order: 1,
    category_id: 2,
  },
];

export const dataSetTest = { categories, tasks };

export const expectedDashboard = {
  tasks: {
    'task-1': {
      id: 'task-1',
      title: 'task-test 1',
      description: 'description of task-test 1',
    },
    'task-2': {
      id: 'task-2',
      title: 'task-test 2',
      description: 'description of task-test 2',
    },
    'task-3': {
      id: 'task-3',
      title: 'task-test 3',
      description: 'description of task-test 3',
    },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'column-test 1',
      taskIds: [],
      backgroundColor: 'rgba(255, 0, 0, 0.25)',
    },
    'column-2': {
      id: 'column-2',
      title: 'column-test 2',
      taskIds: ['task-3'],
      backgroundColor: 'rgba(255, 255, 0, 0.25)',
    },
    'column-3': {
      id: 'column-3',
      title: 'column-test 3',
      taskIds: ['task-1', 'task-2'],
      backgroundColor: 'rgba(0, 255, 0, 0.25)',
    },
  },
  columnOrder: ['column-1', 'column-2', 'column-3'],
};
