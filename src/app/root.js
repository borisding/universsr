import { combineReducers } from 'redux';
import { NODE } from '@config';
import todos from '@pages/todos/reducers';

// eslint-disable-next-line no-unused-vars
const isClient = (state = false, action) => (state = NODE !== true);

// eslint-disable-next-line no-unused-vars
const isFetching = (state = false, action) =>
  (state =
    action.type === 'INIT_FULFILLED' &&
    action.meta &&
    action.meta.isFetching !== false);

// add more reducers here if we have any
const rootReducer = combineReducers({
  isClient,
  isFetching,
  todos
});

export default rootReducer;
