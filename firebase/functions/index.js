const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const User = new require('./user');
const Game = new require('./game');
const user = new User(admin);
const game = new Game(admin);

exports.removeRoom = functions.database.ref('/rooms/{roomID}/deleted')
  .onWrite((event) => {
    const roomID = event.params.roomID;
    const delta = event.data;
    const roomRef = delta.adminRef.parent;
    console.log(`Remove room ${roomID}.`);
    return roomRef.remove()
      .catch((error) => {
        console.log(`Remove room ${roomID} failed.`);
        console.log(error.message)
      })
      .then(() => {
        console.log(`Remove room ${roomID} succeeded.`)
      })
});

exports.changeRoomStatus = functions.database.ref('/rooms/{roomID}/status')
  .onWrite((event) => {
    const roomID = event.params.roomID;
    const delta = event.data;

    // Only if status is "ready"
    if (delta.val() == 'ready' && delta.previous.val() != 'ready') {
      return game.init(roomID)
        .then(() => {
          return delta.adminRef.set('game');
        })
    }
});

exports.changeRoomMembers = functions.database.ref('/rooms/{roomID}/members/{userID}')
  .onWrite((event) => {
    const { roomID, userID } = event.params;
    const delta = event.data;
    const membersRef = delta.adminRef.parent;
    const roomRef = membersRef.parent;
    let action = delta.exists() ? 'join' : 'leave';

    console.log(`User ${userID} ${action} room ${roomID}`);
    return membersRef.once('value')
      .then((snap) => {
        // All members was deleted
        if (!snap.exists()) {
          return null;
        }
        const membersCount = snap.numChildren();
        return roomRef.update({
          membersCount
        })
      })
      .then(() => {
        return user.changeRoom(
          userID,
          action == 'join'
            ? roomID
            : null
        );
      })
});