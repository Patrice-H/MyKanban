import { apiBaseUrl } from '../utils/config';

export const getTasksList = async () => {
  return fetch(`${apiBaseUrl}/api/tasks`).then((response) => {
    return response.json();
  });
};

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

export const getCategoriesList = async () => {
  return fetch(`${apiBaseUrl}/api/categories`).then((response) => {
    return response.json();
  });
};

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

export const getDashboardsList = async () => {
  return fetch(`${apiBaseUrl}/api/dashboards`).then((response) => {
    return response.json();
  });
};

export const getDashboard = async (id) => {
  return fetch(`${apiBaseUrl}/api/dashboard/${id}`).then((response) => {
    return response.json();
  });
};

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
