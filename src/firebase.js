import firebase from "firebase";
import "firebase/app";
// import * as firebase from 'firebase';
import "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyB8GQye3_bObYZPgOmhEVJ6iB0L42ZlNzs",
  authDomain: "api-quiz-66a21.firebaseapp.com",
  databaseURL: "https://api-quiz-66a21-default-rtdb.firebaseio.com",
  projectId: "api-quiz-66a21",
  storageBucket: "api-quiz-66a21.appspot.com",
  messagingSenderId: "657062590828",
  appId: "1:657062590828:web:a9c5006dba2f13c4ae9b49",
  measurementId: "G-4K0N4DT5CR"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(firebaseApp);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const firestore = firebase.firestore();

// export { auth, provider, firestore };
// export default db;
