import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import actions from '../actions';
import types from '../types';
import { requestTypes, requestActions } from '@app/redux/modules/request';

const host = `http://${process.env.HOST}:${process.env.PORT}/api/${process.env.API_VERSION}`;
const mockStore = configureMockStore([
  thunk.withExtraArgument({ ...requestActions })
]);

describe('fetching todos data', () => {
  const endpoint = '/todos';
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
    const response = [{ id: 'todo-id2', todo: 'New Todo', done: false }];

    nock(host)
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

  it('should dispatch `REQUEST_ERROR` action type when failed to fetch todos.', done => {
    const statusCode = 404;
    const errorMessage = 'Request failed with status code 404';

    nock(host)
      .get(endpoint)
      .reply(statusCode, { code: statusCode, message: errorMessage });

    store.dispatch(actions.fetchTodos()).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({ type: types.TODOS_FETCH_BEGIN });
      expect(actions[1]).toEqual({ type: types.TODOS_FETCH_FAILURE });
      expect(actions[2].type).toEqual(requestTypes.REQUEST_ERROR);
      expect(actions[2].payload.code).toEqual(statusCode);
      expect(actions[2].payload.message).toEqual(errorMessage);
      done();
    });
  });
});
