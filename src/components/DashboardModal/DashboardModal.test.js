import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import DashboardModal from '.';

describe('Dasboard modal tests suite', () => {
  // Component intregrity testss
  const setDashboardForm = jest.fn();
  const dashboardForm = {
    dashboard: {
      id: '',
      inputEntry: '',
      inputError: false,
    },
    columns: {
      number: '',
      ids: [],
      inputFields: [],
      inputEntry: [],
      inputError: [],
      backgrounds: [],
    },
  };
  const renderComponents = () => {
    render(
      <DashboardModal
        dashboardForm={dashboardForm}
        setDashboardForm={setDashboardForm}
      />
    );
  };
  it('Should render an input test field to entry dashboard title', () => {
    renderComponents();
    const input = screen.getByTestId('dashboard-title-input');
    expect(input).toBeInTheDocument();
  });
  it('Should render the right label for the dashboard title input text field', () => {
    renderComponents();
    const label = screen.getByText('Titre du tableau de bord');
    expect(label).toBeInTheDocument();
  });
  it('Should render an input test field to entry the number of columns', () => {
    renderComponents();
    const input = screen.getByTestId('columns-number');
    expect(input).toBeInTheDocument();
  });
  it('Should render the right label for the columns number input text field', () => {
    renderComponents();
    const label = screen.getAllByText('Nombre de colonnes');
    expect(label[0]).toBeInTheDocument();
  });
});
