import { combineReducers } from 'redux';
import todos from './todos';

// add more reducers here if we have any
const rootReducer = () =>
  combineReducers({
    todos
  });

export default rootReducer;
