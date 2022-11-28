/* eslint-disable testing-library/no-node-access */
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import DashboardModal from '.';

describe('Dasboard modal tests suite', () => {
  // Component intregrity tests
  const setDashboardForm = jest.fn();
  const dashboardForm = {
    dashboard: {
      id: 1,
      inputEntry: 'test',
      inputError: false,
    },
    columns: {
      number: 2,
      ids: [1, 2],
      inputFields: [1, 2],
      inputEntry: ['titre-1', 'titre-2'],
      inputError: [false, false],
      backgrounds: ['rgba(255, 255, 0, 0.25)', 'rgba(255, 255, 0, 0.25)'],
    },
  };
  const renderComponents = (modalType) => {
    render(
      <DashboardModal
        modalType={modalType}
        dashboardForm={dashboardForm}
        setDashboardForm={setDashboardForm}
      />
    );
  };
  it('Should render an input test field to entry dashboard title', () => {
    renderComponents('updating');
    const input = screen.getByTestId('dashboard-title-input');
    expect(input).toBeInTheDocument();
  });
  it('Should render the right label for the dashboard title input text field', () => {
    renderComponents('updating');
    const label = screen.getByText('Titre du tableau de bord');
    expect(label).toBeInTheDocument();
  });
  it('Should render an input test field to entry the number of columns', () => {
    renderComponents('updating');
    const input = screen.getByTestId('columns-number');
    expect(input).toBeInTheDocument();
  });
  it('Should render the right label for the columns number input text field', () => {
    renderComponents('updating');
    const label = screen.getAllByText('Nombre de colonnes');
    expect(label[0]).toBeInTheDocument();
  });
  it('Should render the right number of colums input field', () => {
    renderComponents('updating');
    const firstColumnInputBlock = screen.getByTestId('input-column-1');
    const secondColumnInputBlock = screen.getByTestId('input-column-2');
    const firstColumnInputField = firstColumnInputBlock.lastChild.firstChild;
    const secondColumnInputField = secondColumnInputBlock.lastChild.firstChild;
    expect(firstColumnInputField).toBeInTheDocument();
    expect(secondColumnInputField).toBeInTheDocument();
  });
  it('Should render the right label for colums input field', () => {
    renderComponents('updating');
    const label1 = screen.getByText('Titre de la colonne 1');
    const label2 = screen.getByText('Titre de la colonne 2');
    expect(label1).toBeInTheDocument();
    expect(label2).toBeInTheDocument();
  });
  it('Should render a button to update the dashboard', () => {
    renderComponents('updating');
    const updateButton = screen.getByText('mettre à jour');
    expect(updateButton).toBeInTheDocument();
  });
  it('Should render a button to cancel the form', () => {
    renderComponents('updating');
    const cancelButton = screen.getByText('annuler');
    expect(cancelButton).toBeInTheDocument();
  });
  it('Should render a button to add the dashboard', () => {
    renderComponents('adding');
    const addButton = screen.getByText('ajouter');
    expect(addButton).toBeInTheDocument();
  });
  it('Should render the pre-filled form', () => {
    renderComponents('updating');
    const textInputBlock = screen.getByTestId('dashboard-title-input');
    const columsNumberInputBlock = screen.getByTestId('columns-number');
    const firstColumnInputBlock = screen.getByTestId('input-column-1');
    const secondColumnInputBlock = screen.getByTestId('input-column-2');
    const titleInputField = textInputBlock.lastChild.firstChild;
    const columsNumberInputField = columsNumberInputBlock.lastChild.firstChild;
    const firstColumnInputField = firstColumnInputBlock.lastChild.firstChild;
    const secondColumnInputField = secondColumnInputBlock.lastChild.firstChild;
    expect(titleInputField.value).toBe('test');
    expect(columsNumberInputField.value).toBe('2');
    expect(firstColumnInputField.value).toBe('titre-1');
    expect(secondColumnInputField.value).toBe('titre-2');
  });
});
