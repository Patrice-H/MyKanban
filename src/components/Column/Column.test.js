import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from '.';

describe('Column tests suite', () => {
  const columnProps = {
    id: 'column-1',
    title: 'title test',
    backgroundColor: 'rgba(255, 0, 0, 0.25)',
  };
  const renderComponents = () => {
    render(
      <DragDropContext>
        <Column column={columnProps} />
      </DragDropContext>
    );
  };
  it('Should render the right background color', () => {
    renderComponents();
    const div = screen.getByTestId('column');
    const expectedColor = 'rgba(255, 0, 0, 0.25)';
    expect(div.style.backgroundColor).toEqual(expectedColor);
  });
  it('Should render the right title', () => {
    renderComponents();
    const title = screen.getByText('title test');
    expect(title).toBeInTheDocument();
  });
});
