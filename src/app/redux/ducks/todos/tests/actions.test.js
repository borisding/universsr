import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import actions from '../actions';
import types from '../types';
import { requestTypes, requestActions } from '@redux/ducks/request';

const host =
  `${process.env.PROTOCOL}://` +
  `${process.env.HOST}:` +
  `${process.env.PORT}` +
  `/api/${process.env.API_VERSION}`;

const endpoint = '/todos';

const mockStore = configureMockStore([
  thunk.withExtraArgument({ ...requestActions })
]);

describe('fetching todos data', () => {
  const response = [{ id: 'todo-id2', todo: 'New Todo', done: false }];
  const errorMessage = 'Request failed with status code 404';
  let store;

  beforeEach(() => {
    store = mockStore({
      todos: {
        isFetching: false,
        isDone: false,
        data: [{ id: 'todo-id1', todo: 'Current Todo', done: true }]
      }
    });
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it('should dispatch `TODOS_FETCH_SUCCESS` action type when fetching todos is already done.', done => {
    nock(host)
      .get(endpoint)
      .reply(200, response);

    store.dispatch(actions.fetchTodos()).then(() => {
      const act = store.getActions();
      expect(act[0]).toEqual({ type: types.TODOS_FETCH_BEGIN });
      expect(act[1]).toEqual({
        type: types.TODOS_FETCH_SUCCESS,
        payload: response
      });
      done();
    });
  });

  it('should dispatch `REQUEST_ERROR` action type when failed to fetch todos.', done => {
    nock(host)
      .get(endpoint)
      .replyWithError(errorMessage);

    store.dispatch(actions.fetchTodos()).then(() => {
      const act = store.getActions();
      expect(act[0]).toEqual({ type: types.TODOS_FETCH_BEGIN });
      expect(act[1]).toEqual({ type: types.TODOS_FETCH_FAILURE });
      expect(act[2].type).toEqual(requestTypes.REQUEST_ERROR);
      expect(act[2].payload.message).toEqual(errorMessage);
      done();
    });
  });

  it('should not fetch data when it is still fetching.', done => {
    store = mockStore({ todos: { isFetching: true, isDone: false, data: [] } });
    store.dispatch(actions.prefetchTodos()).then(() => {
      const action = store.getActions()[0];
      expect(action).toBeUndefined();
      done();
    });
  });

  it('should not fetch data again when fetching todos is already done.', done => {
    store = mockStore({ todos: { isFetching: false, isDone: true, data: [] } });
    store.dispatch(actions.prefetchTodos()).then(() => {
      const action = store.getActions()[0];
      expect(action).toBeUndefined();
      done();
    });
  });
});
