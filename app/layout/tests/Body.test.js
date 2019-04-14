import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import Body from '../Body';

describe('Body', () => {
  it('renders correctly', () => {
    const props = { route: { routes: [] } };
    const tree = renderer
      .create(
        <MemoryRouter>
          <Body {...props} />
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
