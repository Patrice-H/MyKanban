import {
  getCategoryId,
  getInitialDashboard,
  convertColor,
} from '../utils/functions';
import { dataSetTest, expectedDashboard } from '../data/dataTest';
import { initialData } from '../data/initialData';

describe('Unit test of getCategoryId function', () => {
  it('Should return the right category id', () => {
    const testId = getCategoryId('column-1', dataSetTest.categories);
    expect(testId).toEqual(3);
  });
});

describe('Unit test of getInitialDashboard function', () => {
  it('Should return the initial dashboard', () => {
    const initialDashboard = getInitialDashboard(dataSetTest, initialData);
    expect(initialDashboard).toEqual(expectedDashboard);
  });
});

describe('Unit test of convertColor function', () => {
  it('Should return an object with all colors parameters', () => {
    const colorObject = convertColor(
      dataSetTest.categories[0].background_color
    );
    const expectedColorObject = { r: '255', g: '0', b: '0', a: '0.25' };
    expect(colorObject).toEqual(expectedColorObject);
  });
});
