var angular = require('angular');
var app = angular.module('lack');

module.exports = function ($firebaseArray) {
	return {
		createMessages: function (roomId) {
	    var newMessagesRef = firebase.database().ref('messages').child(roomId);
	    return $firebaseArray(newMessagesRef);
	  },

	  checkBuzzWords: function () {

	  },

	  checkVIPs: function () {
	  	
	  }
	}
}