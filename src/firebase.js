import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
// import { cityDb } from './temp/m-city-export';

const firebaseConfig = {
  apiKey: "AIzaSyDaIriPsTTVbnBkyV0ouPAzZ51gVwEoC3E",
  authDomain: "mcity-dd531.firebaseapp.com",
  projectId: "mcity-dd531",
  storageBucket: "mcity-dd531.appspot.com",
  messagingSenderId: "624129203063",
  appId: "1:624129203063:web:77e280508b28d18c0e1f72",
  measurementId: "G-29P7SC5T8Z"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const DB = firebase.firestore();
const matchesCollection = DB.collection('matches');
const playersCollection = DB.collection('players');
const positionsCollection = DB.collection('positions');
const promotionsCollection = DB.collection('promotions');
const teamsCollection = DB.collection('teams');

// cityDb.matches.forEach(item => matchesCollection.add(item));
// cityDb.players.forEach(item => playersCollection.add(item));
// cityDb.positions.forEach(item => positionsCollection.add(item));
// cityDb.promotions.forEach(item => promotionsCollection.add(item));
// cityDb.teams.forEach(item => teamsCollection.add(item));

export { 
  firebase,
  matchesCollection,
  playersCollection,
  positionsCollection,
  promotionsCollection,
  teamsCollection
}