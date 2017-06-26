import * as ac from './actionCreators';
import { auth, database } from 'Firebase';

export function signInAnonymously() {
  return dispatch => {
    dispatch( ac.signInRequest() );

    auth.signInAnonymously()
      .catch(error => {
        dispatch( ac.signInFailure(error) );
      })
  }
}

export function watchAuthChange(dispatch) {
  auth.onAuthStateChanged(user => {
    if (user) {// User is signed in!
      dispatch( ac.signInSuccess(user.uid) );
    } else { // User is signed out!
      dispatch( ac.signOut() );
    }
  });
}

export function watchForUpdates(userID) {
  const userRef = database.ref('users/' + userID + '/room');

  return dispatch => {
    dispatch( ac.subscribe() );

    userRef.on('value', (snap) => {
      const updates = { room: snap.val() };

      dispatch( ac.receiveUpdates(updates) );
    });
  }
}

export function stopWatchForUpdates(userID) {
  const userRef = database.ref('users/' + userID);

  return dispatch => {
    userRef.off();
    dispatch( ac.unsubscribe() );
  }
}

export function watchForRoomStatus(roomID) {
  const roomRef = database.ref('rooms/' + roomID +'/status');

  return dispatch => {
    dispatch( ac.subscribeRoomStatus(roomID) );

    roomRef.on('value', (snap) => {
      const updates = { status: snap.val() };

      dispatch( ac.receiveUpdates(updates) );
    });
  }
}

export function stopWatchForRoomStatus(roomID) {
  const roomRef = database.ref('rooms/' + roomID +'/status');

  return dispatch => {
    roomRef.off();
    dispatch( ac.unsubscribeRoomStatus(roomID) );
    dispatch( ac.receiveUpdates({ status: null }) );
  }
}