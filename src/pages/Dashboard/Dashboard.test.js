import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { dataSetTest, expectedDashboard } from '../../data/dataTest';
import Dashboard from '.';

describe('Dashboard page tests suite', () => {
  const setDashboard = jest.fn();
  const setDbData = jest.fn();
  const setModalType = jest.fn();
  const renderComponents = () => {
    render(
      <MemoryRouter>
        <Dashboard
          dashboard={expectedDashboard}
          dbData={dataSetTest}
          setDashboard={setDashboard}
          setDbData={setDbData}
          setModalType={setModalType}
        />
      </MemoryRouter>
    );
  };
  // Component integrity tests
  it('Should render the header', () => {
    renderComponents();
    const header = screen.getByTestId('header');
    expect(header).toBeInTheDocument();
  });
  it('Should render all columns', () => {
    renderComponents();
    const column1 = screen.getByText('column-test 1');
    const column2 = screen.getByText('column-test 2');
    const column3 = screen.getByText('column-test 3');
    expect(column1).toBeInTheDocument();
    expect(column2).toBeInTheDocument();
    expect(column3).toBeInTheDocument();
  });
  it('Should render all tasks', () => {
    renderComponents();
    const task1 = screen.getByText('task-test 1');
    const task2 = screen.getByText('task-test 2');
    const task3 = screen.getByText('task-test 3');
    expect(task1).toBeInTheDocument();
    expect(task2).toBeInTheDocument();
    expect(task3).toBeInTheDocument();
  });
});
