import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Thumbnail from '.';

describe('Thumbnail tests suite', () => {
  const dashboard = { id: 1, title: 'test' };
  const renderComponents = () => {
    render(
      <MemoryRouter>
        <Thumbnail dashboard={dashboard} />
      </MemoryRouter>
    );
  };
  it('Should render the iframe and the right url', () => {
    renderComponents();
    const iframe = screen.getByTitle('dashboard-1');
    expect(iframe).toBeInTheDocument();
    expect(iframe.src).toBe('http://localhost:3000/dashboard/1');
  });
  it('Should render the customized menu', () => {
    renderComponents();
    const customizedMenu = screen.getByTestId('customized-menu');
    expect(customizedMenu).toBeInTheDocument();
  });
});
