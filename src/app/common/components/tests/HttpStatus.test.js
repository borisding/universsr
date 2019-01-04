import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import HttpStatus from '../HttpStatus';

describe('HttpStatus', () => {
  it('renders correctly', () => {
    const props = {
      children: React.createElement('div', { className: 'page' }),
      statusCode: 404,
      redirectUrl: '/'
    };
    const tree = renderer
      .create(
        <MemoryRouter>
          <HttpStatus {...props} />
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
