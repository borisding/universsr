import types from './types';

const initialState = {
  isFetching: false,
  isDone: false,
  data: []
};

const updateTodo = (state, action) =>
  state.data.map(record => {
    if (record.id !== action.payload.id) {
      return record;
    }

    return { ...record, done: action.payload.done };
  });

export default function reducers(state = initialState, action) {
  switch (action.type) {
    case types.TODOS_FETCH_BEGIN:
      return { ...state, isFetching: true, isDone: false };

    case types.TODOS_FETCH_FAILURE:
      return { ...state, isFetching: false, isDone: false };

    case types.TODOS_FETCH_SUCCESS:
      return {
        isFetching: false,
        isDone: true,
        data: [...state.data, ...action.payload]
      };

    case types.TODOS_ADD:
      return { ...state, data: [...state.data, action.payload] };

    case types.TODOS_UPDATE:
      return { ...state, data: [...updateTodo(state, action)] };

    default:
      return state;
  }
}
