import { ready, wrap } from 'redux-ready-wrapper';
import requestFactory from '@utils/request';
import * as types from './types';

let id = 2;
const request = requestFactory();

// make api request for existing todos and dispatch
export function fetchTodos() {
  return ready(dispatch =>
    request
      .get('/todos')
      .then(res => {
        dispatch({
          type: types.FETCH_TODO,
          payload: res.data
        });
      })
      .catch(err => {
        dispatch({
          type: types.REQUEST_ERROR,
          payload: err
        });
      })
  );
}

// fake adding new todo without saving into db
export function addTodo(input) {
  return wrap(dispatch =>
    dispatch({
      type: types.ADD_TODO,
      payload: {
        id: ++id,
        todo: input,
        done: false
      }
    })
  );
}

// fake updating todo status without saving into db
export function updateTodo({ value, checked }) {
  return {
    type: types.UPDATE_TODO,
    payload: {
      id: value,
      done: checked
    }
  };
}
