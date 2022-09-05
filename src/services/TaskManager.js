import { useFetch } from '../utils/hooks';

export const GetTasksList = () => {
  const { data, message } = useFetch('http://localhost:3001/api/tasks');

  const convert = (list) => {
    let tasks = {};
    list.forEach((task) => {
      tasks = {
        ...tasks,
        [`task-${task.id}`]: {
          id: `task-${task.id}`,
          content: task.name,
        },
      };
    });

    return tasks;
  };

  const tasksList = data && convert(data);

  return { tasksList, message };
};
