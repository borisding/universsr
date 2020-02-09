import types from './types';

export const requestError = data => ({
  type: types.REQUEST_ERROR,
  payload: data
});

export const requestInfo = data => ({
  type: types.REQUEST_INFO,
  payload: data
});

export const requestSuccess = data => ({
  type: types.REQUEST_SUCCESS,
  payload: data
});

export default {
  requestError,
  requestInfo,
  requestSuccess
};
