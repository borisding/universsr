import uuidv4 from 'uuid/v4';
import { wrap, ready } from 'redux-ready-wrapper';
import { errorCreator } from '@middlewares/redux';
import { service } from '@utils';
import * as types from './types';

// make api request for existing todos and dispatch
export const fetchTodos = () => {
  return ready(dispatch =>
    service
      .get('/todos')
      .then(res => dispatch({ type: types.FETCH_TODO, payload: res.data }))
      .catch(err => dispatch(errorCreator(err)))
  );
};

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
