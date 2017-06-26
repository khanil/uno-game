import { NAME } from './constants';

function getLocal(state) {
  return state[NAME];
}

export function getUID(state) {
  return getLocal(state).uid;
}

export function getRoomID(state) {
  return getLocal(state).room;
}

export function getRoomStatus(state) {
  return getLocal(state).status;
}