import { NAME } from './constants';

function getLocal(state) {
  return state[NAME];
}

export function getAll(state) {
  return getLocal(state);
}

export function get(state, id) {
  return getLocal(state)[id];
}