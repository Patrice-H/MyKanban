import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TaskModal from '.';

describe('Task modal tests suite', () => {
  // Integrity tests
  const mockedSetTaskForm = jest.fn();
  const mockedTaskForm = {
    id: 1,
    inputEntry: {
      title: 'test',
      description: 'test',
    },
    inputError: false,
  };
  const renderComponents = (modalType) => {
    render(
      <TaskModal
        taskForm={mockedTaskForm}
        modalType={modalType}
        setTaskForm={mockedSetTaskForm}
      />
    );
  };
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
    // eslint-disable-next-line testing-library/no-node-access
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
  });
});
