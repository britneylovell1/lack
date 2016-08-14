'use strict';

var FriendlyChat = require('./friendlychat');
var app = require('./app.js');
window.onload = function() {
  window.friendlyChat = new FriendlyChat();
};
