import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { dataSetTest } from '../../../data/dataTest';
import MuiCard from '.';

describe('Material UI card component tests suite', () => {
  // Component integrity tests
  const tasks = dataSetTest.tasks;
  const renderComponents = () => {
    render(
      <MemoryRouter>
        <MuiCard task={tasks[0]} isCardExpanded={true} />
      </MemoryRouter>
    );
  };
  it('Should render description subtitle and athe customized button', () => {
    renderComponents();
    const customizedButton = screen.getAllByTestId('long-button');
    const subTitle = screen.getByText('Description :');
    expect(customizedButton[0]).toBeInTheDocument();
    expect(subTitle).toBeInTheDocument();
  });
  it('Should render title and description of a task', () => {
    renderComponents();
    const taskTitle = screen.getByText('task-test 1');
    const taskDescription = screen.getByText('description of task-test 1');
    expect(taskTitle).toBeInTheDocument();
    expect(taskDescription).toBeInTheDocument();
  });
});
