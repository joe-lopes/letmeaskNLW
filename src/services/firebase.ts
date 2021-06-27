import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

/*const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
  };*/

  const firebaseConfig = {
    apiKey: "AIzaSyByF-Q0owhDcV_yTytagr1O4BcIUW9yz0I",
    authDomain: "letmeask-cfa87.firebaseapp.com",
    databaseURL: "https://letmeask-cfa87-default-rtdb.firebaseio.com",
    projectId: "letmeask-cfa87",
    storageBucket: "letmeask-cfa87.appspot.com",
    messagingSenderId: "28201384546",
    appId: "1:28201384546:web:cfbeeb54e6ce9c11e5af3b"
  };
  
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();

export {firebase, auth, database};