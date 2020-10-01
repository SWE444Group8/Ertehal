import * as firebase from "firebase";
import "@firebase/auth";
import "@firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyAoMPSedcgwT4I0vr2QpDcabu5y3KzWz9w  ",
//   authDomain: "ertehal-289e5.firebaseapp.com",
//   databaseURL: "https://ertehal-289e5.firebaseio.com/",
//   projectId: "ertehal-289e5",
//   storageBucket: "ertehal-289e5.appspot.com/",
//   messagingSenderId: "1031423745963",
//   appId: "i1:1031423745963:ios:c3303431f81d945c70fcee",
// };
var firebaseConfig = {
  apiKey: "AIzaSyAoMPSedcgwT4I0vr2QpDcabu5y3KzWz9w",
  authDomain: "ertehal-289e5.firebaseapp.com",
  databaseURL: "https://ertehal-289e5.firebaseio.com",
  projectId: "ertehal-289e5",
  storageBucket: "ertehal-289e5.appspot.com",
  messagingSenderId: "1031423745963",
  appId: "1:1031423745963:web:72f6c009941e5a9570fcee",
  measurementId: "G-9E32DRY0H9"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
