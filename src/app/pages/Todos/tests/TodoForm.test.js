import React from 'react';
import renderer from 'react-test-renderer';
import TodoForm from '../TodoForm';

describe('TodoForm', () => {
  it('renders correctly', () => {
    const props = { addTodo: jest.fn() };
    const tree = renderer.create(<TodoForm {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
