import { dataSetTest } from '../data/dataTest';
import {
  getTasksList,
  createTask,
  updateTask,
  removeTask,
  getCategoriesList,
  createCategory,
  updateCategory,
  removeCategory,
  getDashboardsList,
  getDashboard,
  createDashboard,
  updateDashboard,
  removeDashboard,
} from '../services/dbManager';

const mockFetch = (mockedData) => {
  global.fetch = jest.fn(() => {
    return Promise.resolve({
      json: () => Promise.resolve(mockedData),
    });
  });
};

describe('Unit test suite of getTasksList function', () => {
  it('Should return the tasks list', async () => {
    const mockedData = dataSetTest.tasks;
    mockFetch(mockedData);
    const tasksList = await getTasksList().then((data) => {
      return data;
    });
    expect(tasksList).toEqual(mockedData);
    expect(tasksList.length).toEqual(3);
  });
});

describe('Unit test suite of createTask function', () => {
  it('Should return the created task', async () => {
    const mockedData = dataSetTest.tasks[0];
    mockFetch(mockedData);
    const createdTask = await createTask(
      mockedData.title,
      mockedData.description,
      mockedData.order,
      mockedData.category_id,
      mockedData.dashboard_id
    ).then((data) => {
      return data;
    });
    expect(createdTask).toEqual(mockedData);
    expect(createdTask.id).toEqual(1);
  });
});

describe('Unit test suite of updateTask function', () => {
  it('Should return the updated task', async () => {
    const mockedData = dataSetTest.tasks[0];
    mockFetch(mockedData);
    const updatedTask = await updateTask(
      mockedData.id,
      mockedData.title,
      mockedData.description,
      mockedData.order,
      mockedData.category_id,
      mockedData.dashboard_id
    ).then((data) => {
      return data;
    });
    expect(updatedTask).toEqual(mockedData);
  });
});

describe('Unit test suite of removeTask function', () => {
  it('Should return the deleted task', async () => {
    const mockedData = dataSetTest.tasks[0];
    mockFetch(mockedData);
    const deletedTask = await removeTask(mockedData.id).then((data) => {
      return data;
    });
    expect(deletedTask).toEqual(mockedData);
  });
});

describe('Unit test suite of getCategoriesList function', () => {
  it('Should return the categories list', async () => {
    const mockedData = dataSetTest.categories;
    mockFetch(mockedData);
    const categoriesList = await getCategoriesList().then((data) => {
      return data;
    });
    expect(categoriesList).toEqual(mockedData);
    expect(categoriesList.length).toEqual(3);
  });
});

describe('Unit test suite of createCategory function', () => {
  it('Should return the created category', async () => {
    const mockedData = dataSetTest.categories[0];
    mockFetch(mockedData);
    const createdCategory = await createCategory(
      mockedData.title,
      mockedData.order,
      mockedData.background_color,
      mockedData.dashboard_id
    ).then((data) => {
      return data;
    });
    expect(createdCategory).toEqual(mockedData);
    expect(createdCategory.id).toEqual(3);
  });
});

describe('Unit test suite of updateCategory function', () => {
  it('Should return the updated category', async () => {
    const mockedData = dataSetTest.categories[0];
    mockFetch(mockedData);
    const updatedCategory = await updateCategory(
      mockedData.id,
      mockedData.title,
      mockedData.order,
      mockedData.background_color,
      mockedData.dashboard_id
    ).then((data) => {
      return data;
    });
    expect(updatedCategory).toEqual(mockedData);
  });
});

describe('Unit test suite of removeCategory function', () => {
  it('Should return the deleted category', async () => {
    const mockedData = dataSetTest.categories[0];
    mockFetch(mockedData);
    const deletedCategory = await removeCategory(mockedData.id).then((data) => {
      return data;
    });
    expect(deletedCategory).toEqual(mockedData);
  });
});

describe('Unit test suite of getDashboardsList function', () => {
  it('Should return the dashboards list', async () => {
    const mockedData = dataSetTest.dashboards;
    mockFetch(mockedData);
    const dashboardsList = await getDashboardsList().then((data) => {
      return data;
    });
    expect(dashboardsList).toEqual(mockedData);
    expect(dashboardsList.length).toEqual(2);
  });
});

describe('Unit test suite of getDashboard function', () => {
  it('Should return the dashboard', async () => {
    const mockedData = dataSetTest.dashboards[0];
    mockFetch(mockedData);
    const dashboard = await getDashboard(mockedData.id).then((data) => {
      return data;
    });
    expect(dashboard).toEqual(mockedData);
  });
});

describe('Unit test suite of createDashboard function', () => {
  it('Should return the created dashboard', async () => {
    const mockedData = dataSetTest.dashboards[0];
    mockFetch(mockedData);
    const createdDashboard = await createDashboard(mockedData.title).then(
      (data) => {
        return data;
      }
    );
    expect(createdDashboard).toEqual(mockedData);
    expect(createdDashboard.id).toEqual(1);
  });
});

describe('Unit test suite of updateDashboard function', () => {
  it('Should return the updated dashboard', async () => {
    const mockedData = dataSetTest.dashboards[0];
    mockFetch(mockedData);
    const updatedDashboard = await updateDashboard(
      mockedData.id,
      mockedData.title
    ).then((data) => {
      return data;
    });
    expect(updatedDashboard).toEqual(mockedData);
  });
});

describe('Unit test suite of removeDashboard function', () => {
  it('Should return the deleted dashboard', async () => {
    const mockedData = dataSetTest.dashboards[0];
    mockFetch(mockedData);
    const deletedDashboard = await removeDashboard(mockedData.id).then(
      (data) => {
        return data;
      }
    );
    expect(deletedDashboard).toEqual(mockedData);
  });
});
