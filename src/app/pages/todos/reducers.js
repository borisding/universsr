import * as types from './types';

const initialState = {
  isFetching: false,
  isFetched: false,
  data: [
    {
      id: 'example-todo-id-0',
      todo: 'Current Todo',
      done: false
    }
  ]
};

const updateTodo = (state, action) =>
  state.data.map(record => {
    if (record.id !== action.payload.id) {
      return record;
    }

    return { ...record, done: action.payload.done };
  });

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_TODO_BEGIN:
      return Object.assign({}, state, { isFetching: true, isFetched: false });

    case types.FETCH_TODO_FAILURE:
      return Object.assign({}, state, { isFetching: false, isFetched: false });

    case types.FETCH_TODO_SUCCESS:
      return {
        isFetching: false,
        isFetched: true,
        data: [...state.data, ...action.payload]
      };

    case types.ADD_TODO:
      return { ...state, data: [...state.data, action.payload] };

    case types.UPDATE_TODO:
      return { ...state, data: [...updateTodo(state, action)] };

    default:
      return state;
  }
};
