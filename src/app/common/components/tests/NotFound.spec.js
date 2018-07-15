import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import NotFound from '../NotFound';

it('renders correctly', () => {
  const tree = renderer
    .create(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
