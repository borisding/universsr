import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import * as actions from '../actions';
import * as types from '../types';
import { REQUEST_ERROR } from '@middlewares/redux/service-alert';

const host = 'http://localhost:3000/api/v1';
const endpoint = '/todos';

const mockStore = configureMockStore([thunk]);

describe('fetching todos data', () => {
  const response = [{ id: 'todo-id', todo: 'New Todo', done: false }];
  const errorMessage = 'Request failed with status code 404';
  let fetchMock, store;

  beforeEach(() => {
    store = mockStore({ todos: [] });
    fetchMock = nock(host).get(endpoint);
  });

  afterEach(() => {
    nock.cleanAll();
  });

  test('creates `FETCH_TODO` when fetching todos has been done', done => {
    fetchMock.reply(200, response);

    store.dispatch(actions.fetchTodos()).then(() => {
      expect(store.getActions()[1]).toEqual({
        type: types.FETCH_TODO,
        payload: response
      });
      done();
    });
  });

  test('creates `REQUEST_ERROR` when failed to fetch todos', done => {
    fetchMock.replyWithError(errorMessage);

    store.dispatch(actions.fetchTodos()).then(() => {
      expect(store.getActions()[1].type).toEqual(REQUEST_ERROR);
      expect(store.getActions()[1].payload.message).toEqual(errorMessage);
      done();
    });
  });
});
