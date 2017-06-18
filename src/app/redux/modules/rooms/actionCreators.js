import * as t from './actionTypes';

export function subscribe() {
  return {
    type: t.SUBSCRIBE
  }
}

export function unsubscribe() {
  return {
    type: t.UNSUBSCRIBE
  }
}

export function add(id, info) {
  return {
    type: t.ADD,
    payload: {
      id,
      info
    }
  }
}

export function remove(id) {
  return {
    type: t.REMOVE,
    payload: {
      id
    }
  }
}

export function update(id, changes) {
  return {
    type: t.UPDATE,
    payload: {
      id,
      changes
    }
  }
}