import { service } from '@utils';
import types from './types';

export const fetchTodos = () => {
  return async dispatch => {
    try {
      dispatch({ type: types.TODOS_FETCH_BEGIN });
      const response = await service.get('/todos');
      dispatch({ type: types.TODOS_FETCH_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: types.TODOS_FETCH_FAILURE });
    }
  };
};

export default {
  fetchTodos
};
