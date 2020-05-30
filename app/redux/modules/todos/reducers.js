import types from './types';

const initialState = {
  isFetching: false,
  data: []
};

export default function reducers(state = initialState, actions) {
  switch (actions.type) {
    case types.TODOS_FETCH_BEGIN:
      return { ...state, isFetching: true };
    case types.TODOS_FETCH_FAILURE:
      return { ...state, isFetching: false };
    case types.TODOS_FETCH_SUCCESS:
      return {
        isFetching: false,
        data: [...state.data, ...actions.payload]
      };
    default:
      return state;
  }
}
