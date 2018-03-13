import * as types from './types';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_TODO:
      return [...state, action.payload];

    case types.FETCH_TODO:
      return [...state, ...action.payload];

    case types.UPDATE_TODO:
      return state.map(record => {
        if (record.id !== action.payload.id) {
          return record;
        }

        return {
          ...record,
          done: action.payload.done
        };
      });

    default:
      return state;
  }
};
