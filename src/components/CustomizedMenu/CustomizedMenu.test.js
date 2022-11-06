import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import CustomizedMenu from '.';

describe('Customized menu tests suite', () => {
  // Integrity tests
  const renderComponents = (isCardExpanded) => {
    render(
      <MemoryRouter>
        <CustomizedMenu isCardExpanded={isCardExpanded} />
      </MemoryRouter>
    );
  };
  it('Should render the button to expand menu', () => {
    renderComponents(null);
    const button = screen.getByTestId('long-button');
    expect(button).toBeInTheDocument();
    expect(button.getAttribute('aria-expanded')).toBe(null);
  });
  it('Should expand the menu when user click on button', () => {
    renderComponents(null);
    const button = screen.getByTestId('long-button');
    userEvent.click(button);
    const openTab = screen.getByText('Ouvrir');
    const editTab = screen.getByText('Modifier');
    const deleteTab = screen.getByText('Supprimer');
    expect(button.getAttribute('aria-expanded')).toBe('true');
    expect(openTab).toBeInTheDocument();
    expect(editTab).toBeInTheDocument();
    expect(deleteTab).toBeInTheDocument();
  });
  it('Should display the close tab when card is expanded and user click on button', () => {
    renderComponents(true);
    const button = screen.getByTestId('long-button');
    userEvent.click(button);
    const closeTab = screen.getByText('Fermer');
    expect(closeTab).toBeInTheDocument();
  });
});
