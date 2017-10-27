import axios from 'axios';
import { ready, wrap } from 'redux-ready-wrapper';
import * as types from './types';
import todos from '@fixtures/todos';

let id = todos.length;

// TODO: make api request for existing todos and dispatch
export const fetchTodos = () =>
  ready(dispatch => {
    axios
      .get('/api/todos')
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  });

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
