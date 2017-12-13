import uuidv4 from 'uuid/v4';
import { wrap } from 'redux-ready-wrapper';
import service from '@utils/service';
import * as types from './types';

// make api request for existing todos and dispatch
export const fetchTodos = () =>
  service.get('/todos', { type: types.FETCH_TODO });

// fake adding new todo without saving into db
export const addTodo = input =>
  wrap(dispatch =>
    dispatch({
      type: types.ADD_TODO,
      payload: { id: uuidv4(), todo: input, done: false }
    })
  );

// fake updating todo status without saving into db
export const updateTodo = ({ value, checked }) => ({
  type: types.UPDATE_TODO,
  payload: { id: value, done: checked }
});
