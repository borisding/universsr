import uuidv4 from 'uuid/v4';
import { service } from '@utils';
import types from './types';

// async/await example of making todo api request
export const fetchTodos = () => {
  return async (dispatch, getState, { requestError }) => {
    try {
      await dispatch({ type: types.TODOS_FETCH_BEGIN });
      const res = await service.get('/todos');
      dispatch({ type: types.TODOS_FETCH_SUCCESS, payload: res.data });
    } catch (err) {
      dispatch({ type: types.TODOS_FETCH_FAILURE });
      dispatch(requestError(err));
    }
  };
};

// fake adding new todo without saving into db
export const addTodo = input => dispatch =>
  dispatch({
    type: types.TODOS_ADD,
    payload: { id: uuidv4(), todo: input, done: false }
  });

// fake updating todo status without saving into db
export const updateTodo = ({ value, checked }) => ({
  type: types.TODOS_UPDATE,
  payload: { id: value, done: checked }
});

export default {
  fetchTodos,
  addTodo,
  updateTodo
};
