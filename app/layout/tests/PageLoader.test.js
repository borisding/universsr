import React from 'react';
import renderer from 'react-test-renderer';
import PageLoader from '../PageLoader';

describe('PageLoader', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<PageLoader />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
