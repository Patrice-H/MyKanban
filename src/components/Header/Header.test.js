import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from '.';

describe('Header tests suite', () => {
  const renderComponents = () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
  };

  // Integrity tests
  it('Should display the home link component', () => {
    renderComponents();
    const link = screen.getByText('retour aux tableaux de bord');
    expect(link).toBeInTheDocument();
  });
  it('Should display the adding task button component', () => {
    renderComponents();
    const button = screen.getByText('Nouvelle tâche');
    expect(button).toBeInTheDocument();
  });
  it('Should display the header title component', () => {
    renderComponents();
    const title = screen.getByTestId('header-title');
    expect(title).toBeInTheDocument();
  });
});
