import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
  apiKey: "AIzaSyCRLLekkmtFcdxwTExwoi3BZSMySw9l_Bg",
  authDomain: "booksanta-c70a4.firebaseapp.com",
  databaseURL: "https://booksanta-c70a4.firebaseio.com",
  projectId: "booksanta-c70a4",
  storageBucket: "booksanta-c70a4.appspot.com",
  messagingSenderId: "170353424142",
  appId: "1:170353424142:web:560d02da8049c4c16d895f",
  measurementId: "G-94SCJTYNV5"
  };


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
