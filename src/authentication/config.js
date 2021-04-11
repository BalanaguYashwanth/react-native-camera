import firebase from '@firebase/app'
import 'firebase/firestore'
import 'firebase/firebase-auth'
import 'firebase/storage'

var firebaseConfig = {
    apiKey: "AIzaSyAsReQvLqNvyHHFdkNMgswzlkHsqn4b-eg",
    authDomain: "alarm-a709f.firebaseapp.com",
    databaseURL: "https://alarm-a709f.firebaseio.com",
    projectId: "alarm-a709f",
    storageBucket: "alarm-a709f.appspot.com",
    messagingSenderId: "123772005102",
    appId: "1:123772005102:web:4a4c7b274bc0e58edb61ff"
  };
  // Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);
export default fb
