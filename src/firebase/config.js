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

//var firebaseConfig = {
// apiKey: "AIzaSyBsTjcVmNrnDXlG5_mkTyMd5pmjR5_Zqo4  ",
// authDomain: "ertehal2-92ca1.firebaseapp.com",
// databaseURL: "https://ertehal2-92ca1.firebaseio.com/",
//projectId: "ertehal2-92ca1",
//storageBucket: "gs://ertehal2-92ca1.appspot.com",
//messagingSenderId: "226246250518  ",
// appId: "1:226246250518:ios:e7dfc1ee9343114420a537  ",
//measurementId: "G-9E32DRY0H9",
//};
var firebaseConfig = {
  apiKey: "AIzaSyBsTjcVmNrnDXlG5_mkTyMd5pmjR5_Zqo4",
  authDomain: "ertehal2-92ca1.firebaseapp.com",
  databaseURL: "https://ertehal2-92ca1.firebaseio.com",
  projectId: "ertehal2-92ca1",
  storageBucket: "ertehal2-92ca1.appspot.com",
  messagingSenderId: "226246250518",
  appId: "1:226246250518:web:55b075b994ef5cba20a537",
  measurementId: "G-BVN94DDK5Z",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
