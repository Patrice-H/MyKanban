import { apiBaseUrl } from '../utils/config';

export const getTasksList = async () => {
  return fetch(`${apiBaseUrl}/api/tasks`).then((response) => {
    return response.json();
  });
};

export const createTask = async (title, category, order) => {
  const newTask = {
    title,
    category,
    order,
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

export const updateTask = async (id, title, category, order) => {
  const updatedTask = {
    title,
    category,
    order,
  };
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedTask),
  };

  return fetch(`${apiBaseUrl}/api/task/${id}`, options).then((response) => {
    return response.json();
  });
};

export const removeTask = async (id) => {
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return fetch(`${apiBaseUrl}/api/task/${id}`, options).then((response) => {
    return response.json();
  });
};
