import Rebase from 're-base';
import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyArXJoLvqNDXL_pGYDiGDTfv-0tuR_Tl0M",
  authDomain: "good-grief-58acf.firebaseapp.com",
  databaseURL: "https://good-grief-58acf.firebaseio.com",

};
const app = firebase.initializeApp(config)
const base = Rebase.createClass(app.database())

export {base};