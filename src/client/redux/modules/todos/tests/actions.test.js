import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { service } from '@utils';
import actions from '../actions';
import types from '../types';

const mockStore = configureMockStore([thunk]);

describe('fetching todos data', () => {
  const { baseURL } = service.defaultConfig;
  const endpoint = '/todos?_limit=10';

  let store;
  beforeEach(() => {
    store = mockStore({
      todos: {
        isFetching: false,
        data: [{ id: 1, title: 'Current Todo', completed: true }]
      }
    });
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it('should dispatch `TODOS_FETCH_SUCCESS` action type when fetching todos is already completed.', done => {
    const response = [{ id: 2, title: 'New Todo', completed: false }];

    nock(baseURL)
      .get(endpoint)
      .reply(200, response);

    store.dispatch(actions.fetchTodos()).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({ type: types.TODOS_FETCH_BEGIN });
      expect(actions[1]).toEqual({
        type: types.TODOS_FETCH_SUCCESS,
        payload: response
      });
      done();
    });
  });

  it('should dispatch `TODOS_FETCH_FAILURE` action type when failed to fetch todos.', done => {
    const statusCode = 404;
    const errorMessage = 'Request failed with status code 404';

    nock(baseURL)
      .get(endpoint)
      .reply(statusCode, { code: statusCode, message: errorMessage });

    store.dispatch(actions.fetchTodos()).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({ type: types.TODOS_FETCH_BEGIN });
      expect(actions[1]).toEqual({ type: types.TODOS_FETCH_FAILURE });
      done();
    });
  });
});
