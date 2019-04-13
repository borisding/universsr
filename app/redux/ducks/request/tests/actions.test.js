import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import actions from '../actions';
import types from '../types';

const mockStore = configureMockStore([thunk.withExtraArgument({ ...actions })]);
let store;

describe('ducks request', () => {
  beforeEach(() => {
    store = mockStore({});
  });

  it('should dispatch `REQUEST_ERROR` action type.', () => {
    const data = { error: 'error' };
    store.dispatch(actions.requestError(data));

    const action = store.getActions();
    expect(action[0].type).toEqual(types.REQUEST_ERROR);
    expect(action[0].payload).toEqual(data);
  });

  it('should dispatch `REQUEST_INFO` action type.', () => {
    const data = { info: 'info' };
    store.dispatch(actions.requestInfo(data));

    const action = store.getActions();
    expect(action[0].type).toEqual(types.REQUEST_INFO);
    expect(action[0].payload).toEqual(data);
  });

  it('should dispatch `REQUEST_SUCCESS` action type.', () => {
    const data = { success: 'success' };
    store.dispatch(actions.requestSuccess(data));

    const action = store.getActions();
    expect(action[0].type).toEqual(types.REQUEST_SUCCESS);
    expect(action[0].payload).toEqual(data);
  });
});
