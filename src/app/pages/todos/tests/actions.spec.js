import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import * as actions from '../actions';
import * as types from '../types';
import {
  REQUEST_ERROR,
  errorActionCreator
} from '@middlewares/redux/service-alert';

const host = 'http://localhost:3000/api/v1';
const endpoint = '/todos';

const mockStore = configureMockStore([
  thunk.withExtraArgument({ errorActionCreator })
]);

describe('fetching todos data', () => {
  const response = [{ id: 'todo-id2', todo: 'New Todo', done: false }];
  const errorMessage = 'Request failed with status code 404';
  let fetchMock, store;

  beforeEach(() => {
    store = mockStore({
      todos: {
        isFetching: false,
        isFetched: false,
        data: [{ id: 'todo-id1', todo: 'Current Todo', done: true }]
      }
    });
    fetchMock = nock(host).get(endpoint);
  });

  afterEach(() => {
    nock.cleanAll();
  });

  test('creates `FETCH_TODO_SUCCESS` when fetching todos has been done', done => {
    fetchMock.reply(200, response);

    store.dispatch(actions.fetchTodos()).then(() => {
      const act = store.getActions();

      expect(act[0]).toEqual({ type: types.FETCH_TODO_BEGIN });
      expect(act[1]).toEqual({
        type: types.FETCH_TODO_SUCCESS,
        payload: response
      });
      done();
    });
  });

  test('creates `REQUEST_ERROR` when failed to fetch todos', async done => {
    fetchMock.replyWithError(errorMessage);
    await store.dispatch(actions.fetchTodos());
    const act = store.getActions();

    expect(act[0]).toEqual({ type: types.FETCH_TODO_BEGIN });
    expect(act[1]).toEqual({ type: types.FETCH_TODO_FAILURE });
    expect(act[2].type).toEqual(REQUEST_ERROR);
    expect(act[2].payload.message).toEqual(errorMessage);
    done();
  });

  test('no action is dispatched if it is still fetching.', done => {
    store = mockStore({
      todos: { isFetching: true, isFetched: false, data: [] }
    });
    store.dispatch(actions.prefetchTodos());
    const action = store.getActions()[0];
    expect(action).toBeUndefined();
    done();
  });

  test('no action is dispatched if todos is already fetched.', done => {
    store = mockStore({
      todos: { isFetching: false, isFetched: true, data: [] }
    });
    store.dispatch(actions.prefetchTodos());
    const action = store.getActions()[0];
    expect(action).toBeUndefined();
    done();
  });
});
