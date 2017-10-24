import * as types from './types';
import { wrap } from 'redux-ready-wrapper';
import todos from '@fixtures/todos';

let id = todos.length;

// fake adding new todo
export const addTodo = input =>
  wrap(dispatch =>
    dispatch({
      type: ADD_TODO,
      payload: {
        id: ++id,
        todo: input,
        done: false
      }
    })
  );

// fake updating todo status
export const updateTodo = ({ value, checked }) => ({
  type: UPDATE_TODO,
  payload: {
    id: value,
    done: checked
  }
});
