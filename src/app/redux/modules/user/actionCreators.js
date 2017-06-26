import * as t from './actionTypes';

export function signInRequest() {
  return {
    type: t.SIGN_IN_REQUEST,
  }
};

export function signInSuccess(uid) {
  return {
    type: t.SIGN_IN_SUCCESS,
    payload: {
      uid
    }
  }
};

export function signInFailure(error) {
  return {
    type: t.SIGN_IN_FAILURE,
    payload: error,
    error: true
  }
};

export function signOut() {
  return {
    type: t.SIGN_OUT,
  }
};

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

export function receiveUpdates(updates) {
  return {
    type: t.RECEIVE_UPDATES,
    payload: {
      updates
    }
  }
}

export function subscribeRoomStatus(roomID) {
  return {
    type: t.SUBSCRIBE_ROOM_STATUS,
    payload: {
      roomID
    }
  }
}

export function unsubscribeRoomStatus(roomID) {
  return {
    type: t.UNSUBSCRIBE_ROOM_STATUS,
    payload: {
      roomID
    }
  }
}