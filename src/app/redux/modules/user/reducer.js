import * as t from './actionTypes';

const initialState = {
  loading: false,
  uid: null,
  room: null,
  status: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case t.SIGN_IN_REQUEST:
      return setLoading(state, true);

    case t.SIGN_IN_SUCCESS:
      return login(state, action.payload);

    case t.SIGN_IN_FAILURE:
      return setError(state, action.payload);

    case t.SIGN_OUT:
      return logout(state);

    case t.RECEIVE_UPDATES:
      return update(state, action.payload);

    default:
      return state;
  }
}

function login(state, { uid }) {
  return Object.assign({}, state, {
    uid,
    loading: false
  });
}

function logout(state) {
  return Object.assign({}, state, {
    uid: null
  });
}

function setError(state, { error }) {
  return Object.assign({}, state, {
    error,
    loading: false
  });
}

function setLoading(state, loading) {
  return Object.assign({}, state, {
    loading
  });
}

function update(state, { updates }) {
  return Object.assign({}, state, updates);
}