import { NAME } from './constants';

function getLocal(state) {
  return state[NAME];
}

export function getUID(state) {
  return getLocal(state).uid;
}