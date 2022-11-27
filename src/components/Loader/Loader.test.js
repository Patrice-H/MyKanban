import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Loader from '.';

describe('Loader tests suite', () => {
  it('Should render all components', () => {
    render(<Loader />);
    const bar1 = screen.getByTestId('bar-1');
    const bar2 = screen.getByTestId('bar-2');
    const bar3 = screen.getByTestId('bar-3');
    expect(bar1).toBeInTheDocument();
    expect(bar2).toBeInTheDocument();
    expect(bar3).toBeInTheDocument();
  });
});
