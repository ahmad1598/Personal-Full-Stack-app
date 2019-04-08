import firebase from  'firebase/app'
import 'firebase/storage'

// Initialize Firebase
var config = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: "final-project-763b1.firebaseapp.com",
    databaseURL: "https://final-project-763b1.firebaseio.com",
    projectId: "final-project-763b1",
    storageBucket: "final-project-763b1.appspot.com",
    messagingSenderId: "784320474254"
  };
  firebase.initializeApp(config);

  const storage = firebase.storage()

  export{
      storage,firebase as default
  }

  