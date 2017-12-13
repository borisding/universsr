import { combineReducers } from 'redux';
import todos from './todos/reducers';

const isClient = (state = false, action) =>
  (state = typeof window !== 'undefined');

const isFetching = (state = false, action) =>
  (state = action.type === 'READY_ACTION' && !!action.options.isGet);

const isSaving = (state = false, action) =>
  (state = action.type === 'READY_ACTION' && !action.options.isGet);

const rootReducer = combineReducers({
  todos,
  isClient,
  isFetching,
  isSaving
});

export default rootReducer;
