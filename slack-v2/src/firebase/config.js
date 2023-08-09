import firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBlTYsDZnG6oWl1MKzwlLQzKy566O9xrOQ",
  authDomain: "slack-v2-5924a.firebaseapp.com",
  projectId: "slack-v2-5924a",
  storageBucket: "slack-v2-5924a.appspot.com",
  messagingSenderId: "718137822219",
  appId: "1:718137822219:web:060378afeb4b1812644b0e"
};

// Initialize firebase
firebase.initializeApp(firebaseConfig);

// Initilize firebase services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();

// TimeStamp
const timeStamp = firebase.firestore.Timestamp

export { projectFirestore , projectAuth , projectStorage , timeStamp }