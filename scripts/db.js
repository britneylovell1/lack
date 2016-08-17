var firebase = require('firebase');

var config = {
  apiKey: "AIzaSyAGlJNi77LCyxRye_4--6FM-sAP4uRFccM",
  authDomain: "shhh-lack.firebaseapp.com",
  databaseURL: "https://shhh-lack.firebaseio.com",
  storageBucket: "shhh-lack.appspot.com",
};

var initializeFirebase = function () {
  firebase.initializeApp(config);
}

module.exports = initializeFirebase;
