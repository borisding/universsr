import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import Layout from '../Layout';

describe('Layout', () => {
  it('renders correctly', () => {
    const props = { route: { routes: [] } };
    const tree = renderer
      .create(
        <MemoryRouter>
          <Layout {...props} />
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
