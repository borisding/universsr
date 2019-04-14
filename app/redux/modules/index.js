import { combineReducers } from 'redux';
import todos from './todos';

// add more reducers here if we have any
export const modules = { todos };
const rootReducer = () => combineReducers(modules);

export default rootReducer;
