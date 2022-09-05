import { useFetch } from '../utils/hooks';
import { apiBaseUrl } from '../utils/config';

export const GetTasksList = () => {
  const { data, message } = useFetch(`${apiBaseUrl}/api/tasks`);

  const convert = (list) => {
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

  const tasksList = data && convert(data);

  return { tasksList, message };
};
