import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import actions from '../actions';
import types from '../types';
import { requestTypes, requestActions } from '@redux/ducks/request';

const host = 'http://localhost:3000/api/v1';
const endpoint = '/todos';

const mockStore = configureMockStore([
  thunk.withExtraArgument({ requestError: requestActions.requestError })
]);

describe('fetching todos data', () => {
  const response = [{ id: 'todo-id2', todo: 'New Todo', done: false }];
  const errorMessage = 'Request failed with status code 404';
  let fetchMock, store;

  beforeEach(() => {
    store = mockStore({
      todos: {
        isFetching: false,
        isDone: false,
        data: [{ id: 'todo-id1', todo: 'Current Todo', done: true }]
      }
    });
    fetchMock = nock(host).get(endpoint);
  });

  afterEach(() => {
    nock.cleanAll();
  });

  test('creates `TODOS_FETCH_SUCCESS` when fetching todos is already done.', done => {
    fetchMock.reply(200, response);

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

  test('creates `REQUEST_ERROR` when failed to fetch todos.', async done => {
    fetchMock.replyWithError(errorMessage);
    await store.dispatch(actions.fetchTodos());
    const act = store.getActions();

    expect(act[0]).toEqual({ type: types.TODOS_FETCH_BEGIN });
    expect(act[1]).toEqual({ type: types.TODOS_FETCH_FAILURE });
    expect(act[2].type).toEqual(requestTypes.REQUEST_ERROR);
    expect(act[2].payload.message).toEqual(errorMessage);
    done();
  });

  test('no action is dispatched if it is still fetching.', done => {
    store = mockStore({
      todos: { isFetching: true, isDone: false, data: [] }
    });

    store.dispatch(actions.prefetchTodos()).then(() => {
      const action = store.getActions()[0];
      expect(action).toBeUndefined();
      done();
    });
  });

  test('no action is dispatched if fetching todos is already done.', done => {
    store = mockStore({
      todos: { isFetching: false, isDone: true, data: [] }
    });

    store.dispatch(actions.prefetchTodos()).then(() => {
      const action = store.getActions()[0];
      expect(action).toBeUndefined();
      done();
    });
  });
});
