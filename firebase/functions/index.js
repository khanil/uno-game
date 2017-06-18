const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.userConnectionChange = functions.database.ref('/players/{playerId}')
  .onWrite(event => {
    const snapshot = event.data;

    const playerId = event.params.playerId;
    const deckRef = admin.database().ref('deck');
    const handRef = admin.database().ref('hands/' + playerId);
    const discardRef = admin.database().ref('discard');

    //player go online
    if (!snapshot.previous.exists()) {
      return dealCards(deckRef, handRef);
    }

    //player go offline
    if (!snapshot.exists()) {
      return discardCards(handRef, discardRef);
    }

    //other cases
    return null;
});

exports.shuffleDeckFromDiscard = functions.database.ref('deck')
  .onWrite(event => {
    const snapshot = event.data;

    if (!snapshot.exists()) {
      const discardRef = admin.database().ref('discard');
      return shuffleDiscard(snapshot.ref, discardRef);
    }

    return;
})

function dealCards(deckRef, handRef) {
  return deckRef.limitToFirst(4).once('value')
    .then(snapshot => {
      const cards = snapshot.val();

      const updates = Object.assign({}, cards);
      for (key in updates) {
        updates[key] = null;
      }

      return Promise.all([
        handRef.set(cards),
        deckRef.update(updates)
      ]);
    })
}

function discardCards(handRef, discardRef) {
  return Promise.all([
    handRef.once('value'),
    discardRef.once('value')
  ])
  .then(snapshots => {
    const hand = snapshots[0].val();
    const discard = snapshots[1].val();

    return Promise.all([
      handRef.set(null),
      ...Object.keys(hand).map(key => discardRef.push(hand[key]))
    ]);
  })
}

function shuffleDiscard(deckRef, discardRef) {
  return discardRef.once('value')
    .then(snapshot => {
      const cards = snapshot.val();

      return Promise.all([
        deckRef.set(cards),
        discardRef.set(null)
      ])
    })
}