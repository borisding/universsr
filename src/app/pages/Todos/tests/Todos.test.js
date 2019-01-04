import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { Todos } from '../Todos';

describe('Todos', () => {
  it('renders correctly', () => {
    const props = {
      isFetching: false,
      todos: [{ id: '123', todo: 'todo value', done: false }],
      actions: {
        addTodo: jest.fn(),
        updateTodo: jest.fn(),
        prefetchTodos: jest.fn()
      }
    };
    const tree = renderer
      .create(
        <MemoryRouter>
          <Todos {...props} />
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
