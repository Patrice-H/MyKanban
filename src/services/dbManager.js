import { apiBaseUrl } from '../utils/config';

/**
 * Function to get the tasks list
 *
 * @description It returns a promise that resolves to a JSON object containing the response from the API.
 * @returns {Promise<JSON>} The tasks list and a message
 */
export const getTasksList = async () => {
  return fetch(`${apiBaseUrl}/api/tasks`).then((response) => {
    return response.json();
  });
};

/**
 * Function to create a task
 *
 * @description It takes in 5 arguments, creates a task with them, sends that object to the
 * API, and returns a promise that resolves to a JSON object containing the response from the API.
 * @param {string} title
 * @param {string} description
 * @param {number} order
 * @param {number} category_id
 * @param {number} dashboard_id
 * @returns {Promise<JSON>} The created task and a message
 */
export const createTask = async (
  title,
  description,
  order,
  category_id,
  dashboard_id
) => {
  const newTask = {
    title,
    description,
    order,
    category_id,
    dashboard_id,
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

/**
 * Function to update a task
 *
 * @description It takes in 6 arguments, updates the task with them, sends that object to the
 * API, and returns a promise that resolves to a JSON object containing the response from the API.
 * @param {number} id
 * @param {string} title
 * @param {string} description
 * @param {number} order
 * @param {number} category_id
 * @param {number} dashboard_id
 * @returns {Promise<JSON>} The updated task and a message
 */
export const updateTask = async (
  id,
  title,
  description,
  order,
  category_id,
  dashboard_id
) => {
  const updatedTask = {
    title,
    description,
    order,
    category_id,
    dashboard_id,
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

/**
 * Function to delete a task
 *
 * @description It takes an id as argument, makes a DELETE request to the API, and then it returns
 * a promise that resolves to a JSON object containing the response from the API.
 * @param {number} id
 * @returns {Promise<JSON>} The deleted task and a message
 */
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

/**
 * Function to get the categories list
 *
 * @description It returns a promise that resolves to a JSON object containing the response from the API.
 * @returns {Promise<JSON>} The categories list and a message
 */
export const getCategoriesList = async () => {
  return fetch(`${apiBaseUrl}/api/categories`).then((response) => {
    return response.json();
  });
};

/**
 * Function to create a category
 *
 * @description It takes in 4 arguments, creates a category with them, sends that object to the
 * API, and returns a promise that resolves to a JSON object containing the response from the API.
 * @param {string} title
 * @param {number} order
 * @param {number} background_color
 * @param {number} dashboard_id
 * @returns {Promise<JSON>} The created category and a message
 */
export const createCategory = async (
  title,
  order,
  background_color,
  dashboard_id
) => {
  const newCategory = {
    title,
    order,
    background_color,
    dashboard_id,
  };
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newCategory),
  };

  return fetch(`${apiBaseUrl}/api/categories`, options).then((response) => {
    return response.json();
  });
};

/**
 * Function to update a category
 *
 * @description It takes in 5 arguments, updates the category with them, sends that object to the
 * API, and returns a promise that resolves to a JSON object containing the response from the API.
 * @param {number} id
 * @param {string} title
 * @param {number} order
 * @param {number} background_color
 * @param {number} dashboard_id
 * @returns {Promise<JSON>} The updated category and a message
 */
export const updateCategory = async (
  id,
  title,
  order,
  background_color,
  dashboard_id
) => {
  const updatedTask = {
    title,
    order,
    background_color,
    dashboard_id,
  };
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedTask),
  };

  return fetch(`${apiBaseUrl}/api/category/${id}`, options).then((response) => {
    return response.json();
  });
};

/**
 * Function to delete a category
 *
 * @description It takes an id as argument, makes a DELETE request to the API, and then it returns
 * a promise that resolves to a JSON object containing the response from the API.
 * @param {number} id
 * @returns {Promise<JSON>} The deleted category and a message
 */
export const removeCategory = async (id) => {
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return fetch(`${apiBaseUrl}/api/category/${id}`, options).then((response) => {
    return response.json();
  });
};

/**
 * Function to get the dashboards list
 *
 * @description It returns a promise that resolves to a JSON object containing the response from the API.
 * @returns {Promise<JSON>} The dashboards list and a message
 */
export const getDashboardsList = async () => {
  return fetch(`${apiBaseUrl}/api/dashboards`).then((response) => {
    return response.json();
  });
};

/**
 * Function to get a dashboard
 *
 * @description It takes an id as argument, and then it returns
 * a promise that resolves to a JSON object containing the response from the API.
 * @param {number} id
 * @returns {Promise<JSON>} The dashboard and a message
 */
export const getDashboard = async (id) => {
  return fetch(`${apiBaseUrl}/api/dashboard/${id}`).then((response) => {
    return response.json();
  });
};

/**
 * Function to create a dashboard
 *
 * @description It takes a title as argument, creates a dashboard with it, sends that object to the
 * API, and returns a promise that resolves to a JSON object containing the response from the API.
 * @param {string} title
 * @returns {Promise<JSON>} The created dashboard and a message
 */
export const createDashboard = async (title) => {
  const newDashboard = {
    title,
  };
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newDashboard),
  };

  return fetch(`${apiBaseUrl}/api/dashboards`, options).then((response) => {
    return response.json();
  });
};

/**
 * Function to update a dashboard
 *
 * @description It takes an id and a title as arguments, updates the dashboard with them, sends that object to the
 * API, and returns a promise that resolves to a JSON object containing the response from the API.
 * @param {number} id
 * @param {string} title
 * @returns {Promise<JSON>} The updated dashboard and a message
 */
export const updateDashboard = async (id, title) => {
  const updatedTask = {
    title,
  };
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedTask),
  };

  return fetch(`${apiBaseUrl}/api/dashboard/${id}`, options).then(
    (response) => {
      return response.json();
    }
  );
};

/**
 * Function to delete a dashboard
 *
 * @description It takes an id as argument, makes a DELETE request to the API, and then it returns
 * a promise that resolves to a JSON object containing the response from the API.
 * @param {number} id
 * @returns {Promise<JSON>} The deleted dashboard and a message
 */
export const removeDashboard = async (id) => {
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return fetch(`${apiBaseUrl}/api/dashboard/${id}`, options).then(
    (response) => {
      return response.json();
    }
  );
};
