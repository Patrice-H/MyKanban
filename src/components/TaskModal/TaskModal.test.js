/* eslint-disable testing-library/no-node-access */
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expectedDashboard, dataSetTest } from '../../data/dataTest';
import TaskModal from '.';

describe('Task modal tests suite', () => {
  const mockedSetTaskForm = jest.fn();
  const setModalType = jest.fn();
  const setMessage = jest.fn();
  const setIsSnackbarOpen = jest.fn();
  const mockedTaskForm = {
    id: 'task-1',
    inputEntry: {
      title: 'test',
      description: 'test',
    },
    inputError: false,
  };
  const renderComponents = (modalType) => {
    render(
      <TaskModal
        dashboard={expectedDashboard}
        categories={dataSetTest.categories}
        taskForm={mockedTaskForm}
        modalType={modalType}
        setTaskForm={mockedSetTaskForm}
        setModalType={setModalType}
        setMessage={setMessage}
        setIsSnackbarOpen={setIsSnackbarOpen}
      />
    );
  };

  // Component integrity tests

  it('Should render an input test field to entry task title', () => {
    renderComponents('updating');
    const input = screen.getByTestId('task-title-input');
    expect(input).toBeInTheDocument();
  });
  it('Should render the right label for the input text field', () => {
    renderComponents('updating');
    const label = screen.getByText('Titre de la tâche');
    expect(label).toBeInTheDocument();
  });
  it('Should render a text area to entry the task description', () => {
    renderComponents('updating');
    const textArea = screen.getByLabelText('Description');
    expect(textArea).toBeInTheDocument();
  });
  it('Should render the right label for the text area field', () => {
    renderComponents('updating');
    const label = screen.getAllByText('Description');
    expect(label[0]).toBeInTheDocument();
  });
  it('Should render a button to update the task', () => {
    renderComponents('updating');
    const updateButton = screen.getByText('mettre à jour');
    expect(updateButton).toBeInTheDocument();
  });
  it('Should render a button to cancel the form', () => {
    renderComponents('updating');
    const cancelButton = screen.getByText('annuler');
    expect(cancelButton).toBeInTheDocument();
  });
  it('Should render a button to add the task', () => {
    renderComponents('adding');
    const addButton = screen.getByText('ajouter');
    expect(addButton).toBeInTheDocument();
  });
  it('Should render the pre-filled form', () => {
    renderComponents('updating');
    const inputBlock = screen.getByTestId('task-title-input');
    const inputField = inputBlock.lastChild.firstChild;
    const textArea = screen.getByLabelText('Description');
    expect(inputField.value).toBe('test');
    expect(textArea.value).toBe('test');
  });

  // Integration tests

  it('Should render an error message when empty form is submited', () => {
    mockedTaskForm.inputEntry.title = '';
    mockedTaskForm.inputError = true;
    renderComponents('adding');
    const addButton = screen.getByText('ajouter');
    userEvent.click(addButton);
    const errorMessage = screen.getByText('Titre requis');
    expect(errorMessage).toBeInTheDocument();
    mockedTaskForm.inputEntry.title = 'test';
  });
  it('Should close modal when user click on cancel button', () => {
    renderComponents('updating');
    const modal = screen.getByTestId('task-modal');
    const cancelButton = screen.getByText('annuler');
    userEvent.click(cancelButton);
    expect(modal.classList[1]).toBe('hidden-modal');
  });
  it('Should update the value of title input when user change the value', () => {
    renderComponents('updating');
    const titleBlock = screen.getByTestId('task-title-input');
    const titleInput = Array.from(
      Array.from(titleBlock.children)[1].children
    )[0];
    userEvent.click(titleInput);
    userEvent.type(titleInput, 'test-title');
    expect(mockedSetTaskForm).toHaveBeenCalled();
  });
  it('Should update the value of description input when user change the value', () => {
    renderComponents('updating');
    const descriptionBlock = screen.getByTestId('task-description-input');
    const descriptionInput = Array.from(
      Array.from(descriptionBlock.children)[1].children
    )[0];
    userEvent.click(descriptionInput);
    userEvent.type(descriptionInput, 'test-description');
    expect(mockedSetTaskForm).toHaveBeenCalled();
  });
});
