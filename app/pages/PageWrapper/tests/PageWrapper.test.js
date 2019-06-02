import React from 'react';
import renderer from 'react-test-renderer';
import PageWrapper from '../';

describe('PageWrapper', () => {
  it('renders correctly', () => {
    const props = { children: ['<div>page child</div>'], title: 'Page Title' };
    const tree = renderer.create(<PageWrapper {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
