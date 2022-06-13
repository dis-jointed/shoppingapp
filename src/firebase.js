import firebase from "firebase";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCgFrED4Dm4jYLW157SeirZOVO5SeIs2L8",
    authDomain: "shopping-clone-3a458.firebaseapp.com",
    projectId: "shopping-clone-3a458",
    storageBucket: "shopping-clone-3a458.appspot.com",
    messagingSenderId: "41239383319",
    appId: "1:41239383319:web:a3046dd6799b070707bb52",
    measurementId: "G-CDJB1KHXZB"
  }

  
  const firebaseapp = firebase.initializeApp(firebaseConfig);

  const db = firebaseapp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();

  export { db, auth, storage };