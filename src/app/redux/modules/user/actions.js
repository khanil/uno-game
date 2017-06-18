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
  const userRef = database.ref('users/' + userID);

  return dispatch => {
    dispatch( ac.subscribe() );

    userRef.on('value', (snap) => {
      dispatch( ac.receiveUpdates(snap.val()) );
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