import { apiBaseUrl } from '../utils/config';

export const getTasksList = async () => {
  return fetch(`${apiBaseUrl}/api/tasks`).then((response) => {
    return response.json();
  });
};

export const createTask = async (title, category, order) => {
  const newTask = {
    name: title,
    category: category,
    order: order,
  };
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newTask),
  };

  return fetch(`${apiBaseUrl}/api/tasks`, options).then((response) => {
    return response.json();
  });
};
