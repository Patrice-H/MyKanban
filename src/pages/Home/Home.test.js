import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import Home from '.';

describe('Home page tests suite', () => {
  const setDashboard = jest.fn();
  const setDbData = jest.fn();
  const setModalType = jest.fn();
  const renderComponents = () => {
    render(
      <Home
        setDashboard={setDashboard}
        setDbData={setDbData}
        setModalType={setModalType}
      />
    );
  };
  // Component intregrity tests
  it('Should render the button to open dashboard modal', () => {
    renderComponents();
    const addDashboardBtn = screen.getByText('Nouveau tableau');
    expect(addDashboardBtn).toBeInTheDocument();
  });
  it('Should render the right title', () => {
    renderComponents();
    const title = screen.getByText('Tableaux de bord');
    expect(title).toBeInTheDocument();
  });
  it('Should render the thumbnails container', () => {
    renderComponents();
    const ThumbnailsContainer = screen.getByTestId('thumbnails-container');
    expect(ThumbnailsContainer).toBeInTheDocument();
  });
  it('Should render dashboard modal', () => {
    renderComponents();
    const dashboardModal = screen.getByTestId('dashboard-modal');
    expect(dashboardModal).toBeInTheDocument();
  });
  // Integration tests
  it('Should open dashboard modal when user click on new dashboard button', () => {
    renderComponents();
    const addDashboardBtn = screen.getByText('Nouveau tableau');
    const dashboardModal = screen.getByTestId('dashboard-modal');
    expect(dashboardModal.classList[1]).toBe('hidden-modal');
    fireEvent.click(addDashboardBtn);
    expect(dashboardModal.classList[1]).toBe(undefined);
  });
});
