import * as types from './types';
import { wrap } from 'redux-ready-wrapper';
import todos from '@fixtures/todos';

let id = todos.length;

// fake adding new todo without saving into db
export const addTodo = input =>
  wrap(dispatch =>
    dispatch({
      type: types.ADD_TODO,
      payload: {
        id: ++id,
        todo: input,
        done: false
      }
    })
  );

// fake updating todo status without saving into db
export const updateTodo = ({ value, checked }) => ({
  type: types.UPDATE_TODO,
  payload: {
    id: value,
    done: checked
  }
});
