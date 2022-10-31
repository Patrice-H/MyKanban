import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import TaskModal from '.';

describe('Task modal tests suite', () => {
  // Integrity tests
  const taskForm = {
    id: '',
    inputEntry: {
      title: '',
      description: '',
    },
    inputError: false,
  };
  const renderComponents = () => {
    render(<TaskModal taskForm={taskForm} />);
  };
  it('Should render an input test field to entry task title', () => {
    renderComponents();
    const input = screen.getByTestId('task-title-input');
    expect(input).toBeInTheDocument();
  });
  it('Should render the right label for the input text field', () => {
    renderComponents();
    const label = screen.getByText('Titre de la tâche');
    expect(label).toBeInTheDocument();
  });
  it('Should render a text area to entry the task description', () => {
    renderComponents();
    const textArea = screen.getByLabelText('Description');
    expect(textArea).toBeInTheDocument();
  });
  it('Should render the right label for the text area field', () => {
    renderComponents();
    const label = screen.getAllByText('Description');
    expect(label[0]).toBeInTheDocument();
  });
  it('Should render a button to update the task', () => {
    renderComponents();
    const updateButton = screen.getByText('mettre à jour');
    expect(updateButton).toBeInTheDocument();
  });
  it('Should render a button to cancel the form', () => {
    renderComponents();
    const cancelButton = screen.getByText('annuler');
    expect(cancelButton).toBeInTheDocument();
  });
  it('Should render a button to add the task', () => {
    render(<TaskModal taskForm={taskForm} modalType="adding" />);
    const addButton = screen.getByText('ajouter');
    expect(addButton).toBeInTheDocument();
  });
});
