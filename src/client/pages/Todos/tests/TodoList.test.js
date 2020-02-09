import React from 'react';
import renderer from 'react-test-renderer';
import TodoList from '../TodoList';

describe('TodoList', () => {
  it('renders correctly', () => {
    const props = {
      todos: [{ id: '123', todo: 'todo value', done: false }],
      updateTodo: jest.fn()
    };
    const tree = renderer.create(<TodoList {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
