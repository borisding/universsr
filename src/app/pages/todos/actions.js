import uuidv4 from 'uuid/v4';
import { service } from '@utils';
import * as types from './types';

// async/await example of making todo api request
export const fetchTodos = () => {
  return async (dispatch, getState, { errorActionCreator }) => {
    try {
      await dispatch({ type: types.FETCH_TODO_BEGIN });
      const res = await service.get('/todos');

      return dispatch({
        type: types.FETCH_TODO_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      dispatch({ type: types.FETCH_TODO_FAILURE });
      dispatch(errorActionCreator(err));
    }
  };
};

// pre-fetch todos when there is no populated todos in store
export const prefetchTodos = () => (dispatch, getState) => {
  const { isFetching, isFetched } = getState().todos;

  // no action when it's fetching todos
  // or, todos is already fetched
  if (isFetching || isFetched) {
    return Promise.resolve(true);
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
