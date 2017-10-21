import { combineReducers } from 'redux';
import todos from './todos/reducers';

const rootReducer = combineReducers({
  todos
});

export default rootReducer;
