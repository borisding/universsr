import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import todos from './todos';

// add more reducers here if we have any
export default function createRootReducer(history) {
  return combineReducers({ router: connectRouter(history), todos });
}
