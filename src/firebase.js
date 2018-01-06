import firebase from 'firebase';

  // Initialize Firebase
  const config = {
    apiKey: `AIzaSyACRHNCmyHpF_61PxbjbWShMstUIlHKJZo`,
    authDomain: `js-courses-vasilchenko-2017.firebaseapp.com`,
    databaseURL: `https://js-courses-vasilchenko-2017.firebaseio.com`,
    projectId: `js-courses-vasilchenko-2017`,
    storageBucket: `js-courses-vasilchenko-2017.appspot.com`,
    messagingSenderId: `247236283842`
  };
  firebase.initializeApp(config);

  export default firebase;

  export const database=firebase.database();
