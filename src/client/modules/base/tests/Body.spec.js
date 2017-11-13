import React from 'react';
import renderer from 'react-test-renderer';
import Body from '../Body';

it('renders correctly', () => {
  const props = {
    route: {},
    isClient: true,
    isFetching: false
  };
  const tree = renderer.create(<Body {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
