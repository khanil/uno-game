import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyCgRa4d23rVMyp-Kj75LvYcZ9VcDSLTBPM",
  authDomain: "uno-game-e1722.firebaseapp.com",
  databaseURL: "https://uno-game-e1722.firebaseio.com",
  projectId: "uno-game-e1722",
  storageBucket: "uno-game-e1722.appspot.com",
  messagingSenderId: "788259676309"
};

firebase.initializeApp(config);
export const database = firebase.database();
export const auth = firebase.auth();