import isDev from 'isdev';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';

const middlewares = [];

if (isDev) {
  middlewares.push(createLogger({ duration: true }));
}

const rootReducer = combineReducers({
  todos: () => ({})
});

export default createStore(rootReducer, applyMiddleware(...middlewares));
