import firebase from 'firebase/app';
import 'firebase/auth';

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

export { firebase }