import React from 'react';
import renderer from 'react-test-renderer';
import TodoList from '../TodoList';

describe('TodoList', () => {
  it('renders correctly', () => {
    const props = {
      todos: [{ id: 1, title: 'todo value', completed: false }]
    };
    const tree = renderer.create(<TodoList {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
