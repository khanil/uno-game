import * as ac from './actionCreators';
import { auth, database } from 'Firebase';

const ref = database.ref('/rooms');
const usersRef = database.ref('/users');

export function watchForUpdates(dispatch) {
  dispatch( ac.subscribe() );

  ref.on('child_added', (snap) => {
    dispatch( ac.add(snap.key, snap.val()) );
  });

  ref.on('child_removed', (snap) => {
    dispatch( ac.remove(snap.key) );
  });

  ref.on('child_changed', (snap) => {
    dispatch( ac.update(snap.key, snap.val()) );
  });
}

export function stopWatchForUpdates() {
  return dispatch => {
    ref.off();
    dipatch( ac.unsubscribe() );
  }
}

export function create(user, capacity) {
  return dipatch => {
    const room = {
      capacity,
      members: {
        [user]: true
      }
    };

    const newRoomRef = ref.update({
      [user]: room
    });

    usersRef.child(user + "/room").set(user);
  }
}

export function join(user, id) {
  return dispatch => {
    ref.child(id + "/members").update({
      [user]: true
    });

    usersRef.child(user + "/room").set(id);
  }
}

export function leave(user, id) {
  return dispatch => {
    ref.child(id + "/members").update({
      [user]: null
    });

    usersRef.child(user + "/room").remove();
  }
}

export function remove(id) {
  return dispatch => {
    ref.child(id).remove();

    usersRef.child(id + "/room").remove();
  }
}

export function startGame(id) {
  return dispatch => {
    ref.child(id).update({
      "status": "playing"
    })
  }
}