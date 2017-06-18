import * as t from './actionTypes';

const initialState = {
  // roomID: { info }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case t.ADD:
      return add(state, action.payload);

    case t.REMOVE:
      return remove(state, action.payload);

    case t.UPDATE:
      return update(state, action.payload);

    default:
      return state;
  }
}

function add(state, { id, info }) {
  return Object.assign({}, state, {
    [id]: info
  });
}

function remove(state, { id }) {
  const newState = Object.assign({}, state);
  delete newState[id];
  return newState;
}

function update(state, { id, changes }) {
  return Object.assign({}, state, {
    [id]: changes
  });
}
