import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import * as utilsFunction from '../../utils/functions';
import Header from '.';

describe('Header tests suite', () => {
  const setModalType = jest.fn();
  utilsFunction.openModal = jest.fn();
  const renderComponents = () => {
    render(
      <MemoryRouter>
        <Header setModalType={setModalType} />
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
  // Integration test
  it('Should open modal when the adding task button is clicked', () => {
    renderComponents();
    const button = screen.getByText('Nouvelle tâche');
    fireEvent.click(button);
    expect(utilsFunction.openModal).toHaveBeenCalled();
    expect(setModalType).toHaveBeenCalled();
  });
});
