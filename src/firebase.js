import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAQJQLycBvTM9-X1QGIzhKJxZ5eIuHtqN0",
  authDomain: "mydoctor-402213.firebaseapp.com",
  projectId: "mydoctor-402213",
  storageBucket: "mydoctor-402213.appspot.com",
  messagingSenderId: "339928265859",
  appId: "1:339928265859:web:17bd7d38b20ea728aad7b6",
  measurementId: "G-DQ8GMRHDG7",
};

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { auth, db, storage };
