'use strict';

var app = require('./app.js');
var initializeFirebase = require('./db.js');

window.onload = function() {
  initializeFirebase();
};
