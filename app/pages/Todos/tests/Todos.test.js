import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import Todos from '../Todos';

jest.mock('react-frontload', () => ({
  useFrontload: () => ({ data: [], frontloadMeta: {} })
}));

describe('Todos', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <Todos />
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
