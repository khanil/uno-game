import { NAME } from './constants';

function getLocal(state) {
  return state[NAME];
}

export function getUID(state) {
  return getLocal(state).uid;
}

export function getRoom(state) {
  return getLocal(state).room;
}

export function getStatus(state) {
  return getLocal(state).status;
}