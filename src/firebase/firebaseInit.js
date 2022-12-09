import firebase from "firebase/app";
import "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCGL7PQ0MymQPwqSmCziiZI3FMpktgwh_M",
  authDomain: "rent-me-db-9a1d2.firebaseapp.com",
  projectId: "rent-me-db-9a1d2",
  storageBucket: "rent-me-db-9a1d2.appspot.com",
  messagingSenderId: "469003622753",
  appId: "1:469003622753:web:5cc450b352363c4dc00d20",
  measurementId: "G-Q2X8E8J23W"
};


const firebaseApp = firebase.initializeApp(firebaseConfig);
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export {timestamp};
export default firebaseApp.firestore();