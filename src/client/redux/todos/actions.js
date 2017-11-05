import { ready, wrap } from 'redux-ready-wrapper';
import requestFactory from '@api/request';
import * as types from './types';

let id = 2;
const request = requestFactory();

// make api request for existing todos and dispatch
// fake request delay for is fetching effect
export function fetchTodos() {
  const makeRequest = dispatch =>
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
      });

  return ready(
    (dispatch, getState) =>
      getState().isClient
        ? setTimeout(() => makeRequest(dispatch), 1000) // fake delay on client side
        : makeRequest(dispatch)
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
