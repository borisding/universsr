import { combineReducers } from 'redux';
import todos from './todos/reducers';

const isClient = (state = false, action) => {
  state = typeof window !== 'undefined';
  return state;
};

const isFetching = (state = false, action) => {
  state = action.type === 'READY_ACTION';
  return state;
};

const rootReducer = combineReducers({
  todos,
  isClient,
  isFetching
});

export default rootReducer;
