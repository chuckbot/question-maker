import firebase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyCqBDm-qgGMa_rA11R-zWKvWVJWgM6F_AE",
  authDomain: "question-maker-ab3ac.firebaseapp.com",
  projectId: "question-maker-ab3ac",
  storageBucket: "question-maker-ab3ac.appspot.com",
  messagingSenderId: "1075154360126",
  appId: "1:1075154360126:web:138eb2cd4659621acfbe6f",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
