function Game(admin) {
  this.cardsRef = admin.database().ref('entities/cards');
  this.gamesRef = admin.database().ref('games');
  this.roomsRef = admin.database().ref('rooms');

  this.DEFAULT_DEAL = 7;

  this.getDefault = function() {
    const newGame = {
      turn: null,
      direction: 'clockwise',
      hands: [],
      players: [],
      deck: [],
      discard: []
    }

    return newGame;
  }

  this.init = function(id) {
    const gameRef = this.gamesRef.child(id);
    const membersRef = this.roomsRef.child(id + '/members');
    const newGame = this.getDefault();

    return membersRef.once('value')
      .then((snap) => {
        console.log(snap.val());
        newGame.players = shuffle( Object.keys(snap.val() || {}) );
        newGame.turn = newGame.players[0];

        return this.cardsRef.once('value');
      })
      .then((snap) => {
        newGame.deck = shuffle( Object.keys(snap.val() || []) );

        let offset = 0;
        newGame.players.forEach((playerID) => {
          let hand = {};
          hand.cards = newGame.deck.slice(offset, offset + this.DEFAULT_DEAL);
          hand.amount = this.DEFAULT_DEAL;
          newGame.hands[playerID] = hand;
          offset += this.DEFAULT_DEAL;
        });

        newGame.discard = newGame.deck.slice(offset, ++offset);

        newGame.deck = newGame.deck.slice(offset);

        return gameRef.set(newGame);
      })
  }
}

function shuffle(a) {
  for (let i = a.length; i; i--) {
      let j = Math.floor(Math.random() * i);
      [a[i - 1], a[j]] = [a[j], a[i - 1]];
  }
  return a;
}

module.exports = Game;