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
    store.dispatch(actions.requestError({ error: 'error' }));
    const action = store.getActions();

    expect(action[0].type).toEqual(types.REQUEST_ERROR);
    expect(action[0].payload).toEqual({ error: 'error' });
  });

  it('should dispatch `REQUEST_INFO` action type.', () => {
    store.dispatch(actions.requestInfo({ info: 'info' }));
    const action = store.getActions();

    expect(action[0].type).toEqual(types.REQUEST_INFO);
    expect(action[0].payload).toEqual({ info: 'info' });
  });

  it('should dispatch `REQUEST_SUCCESS` action type.', () => {
    store.dispatch(actions.requestSuccess({ success: 'success' }));
    const action = store.getActions();

    expect(action[0].type).toEqual(types.REQUEST_SUCCESS);
    expect(action[0].payload).toEqual({ success: 'success' });
  });
});
