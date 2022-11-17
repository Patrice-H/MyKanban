import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/react';
import * as dbManager from '../../../services/dbManager';
import MuiHeading1 from '.';

describe('MuiHeading1 tests suite', () => {
  it('Should call getDashboard function', async () => {
    const spy = jest.spyOn(dbManager, 'getDashboard');
    spy.mockImplementation(() => {
      return new Promise((resolve) =>
        resolve({
          data: { title: 'essai' },
        })
      );
    });
    render(<MuiHeading1 />);
    await waitFor(() => {
      expect(spy).toHaveBeenCalled();
    });
  });
});
