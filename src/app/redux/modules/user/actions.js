import * as t from './actionTypes';
import { auth, database } from 'Firebase';

export function signInAnonymously() {
  return dispatch => {
    dispatch( signInRequest() );

    auth.signInAnonymously()
      // .then(user => {
      //   dispatch( signInSuccess(user.uid) );
      // })
      .catch(error => {
        dispatch( signInFailure(error) );
      })
  }
}

export function watchAuthChange(dispatch) {
  auth.onAuthStateChanged(user => {
    if (user) {// User is signed in!
      dispatch( signInSuccess(user.uid) );
    } else { // User is signed out!
      dispatch( signOut() );
    }
  });
}

function signInRequest() {
  return {
    type: t.SIGN_IN_REQUEST,
  }
};

function signInSuccess(uid) {
  return {
    type: t.SIGN_IN_SUCCESS,
    payload: {
      uid
    }
  }
};

function signInFailure(error) {
  return {
    type: t.SIGN_IN_FAILURE,
    payload: error,
    error: true
  }
};

function signOut() {
  return {
    type: t.SIGN_OUT,
  }
};


