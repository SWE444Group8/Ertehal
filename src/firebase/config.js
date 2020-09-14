import * as firebase from "firebase";
import "@firebase/auth";
import "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAoMPSedcgwT4I0vr2QpDcabu5y3KzWz9w  ",
  authDomain: "ertehal-289e5.firebaseapp.com",
  databaseURL: "https://ertehal-289e5.firebaseio.com/",
  projectId: "ertehal-289e5",
  storageBucket: "ertehal-289e5.appspot.com/",
  messagingSenderId: "1031423745963",
  appId: "i1:1031423745963:ios:c3303431f81d945c70fcee",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
