import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import todos from './todos';

// add more reducers here if we have any
const rootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    todos
  });

export default rootReducer;
