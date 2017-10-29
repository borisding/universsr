import { combineReducers } from 'redux';
import todos from './todos/reducers';

const rootReducer = combineReducers({
  todos,
  isClient: (initialState = false, action) => typeof window !== 'undefined',
  isFetching: (initialState = false, action) => action.type === 'READY_ACTION'
});

export default rootReducer;
