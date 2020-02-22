import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { Todos } from '../Todos';

describe('Todos', () => {
  it('renders correctly', () => {
    const props = {
      isFetching: false,
      todos: [{ id: 1, title: 'todo value', completed: false }],
      actions: {
        fetchTodos: jest.fn()
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
