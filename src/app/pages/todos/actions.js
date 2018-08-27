import uuidv4 from 'uuid/v4';
import init from 'redux-thunk-init';
import { service } from '@utils';
import * as types from './types';

// async/await example of making todo api request with `init` wrapper
// error will be handled by `redux-thunk-init` addon
export const fetchTodos = () =>
  init(async dispatch => {
    const res = await service.get('/todos');
    dispatch({ type: types.FETCH_TODO, payload: res.data });
  });

// pre-fetch todos when there is no populated todos in store
export const prefetchTodos = () => (dispatch, getState) => {
  const { isFetching, todos } = getState();

  // simply exit pre-fetching if in fetching mode
  // or, todos is already populated
  if (isFetching || todos.length > 0) {
    return null;
  }

  // else, just proceed to fetching new todos list
  return dispatch(fetchTodos());
};

// fake adding new todo without saving into db
export const addTodo = input => {
  return dispatch =>
    Promise.resolve(
      dispatch({
        type: types.ADD_TODO,
        payload: { id: uuidv4(), todo: input, done: false }
      })
    );
};

// fake updating todo status without saving into db
export const updateTodo = ({ value, checked }) => ({
  type: types.UPDATE_TODO,
  payload: { id: value, done: checked }
});
