import React from 'react';
import renderer from 'react-test-renderer';
import Container from '../Container';

describe('Container', () => {
  it('renders correctly', () => {
    const props = { children: ['<div>page child</div>'], title: 'Page Title' };
    const tree = renderer.create(<Container {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
