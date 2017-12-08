import firebase from 'firebase'
var config = {
  apiKey: "AIzaSyArXJoLvqNDXL_pGYDiGDTfv-0tuR_Tl0M",
  authDomain: "good-grief-58acf.firebaseapp.com",
  databaseURL: "https://good-grief-58acf.firebaseio.com",
  projectId: "good-grief-58acf",
  storageBucket: "good-grief-58acf.appspot.com",
  messagingSenderId: "696958046252"
};
var fire = firebase.initializeApp(config);
export default fire;

