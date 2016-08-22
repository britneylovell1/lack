var angular = require('angular');
var app = angular.module('lack');

module.exports = function ($firebaseArray, UserFactory) {

	var user = UserFactory.getCurrentUser();
  var settingsRef = firebase.database().ref('users/' + user.uid).child('settings');

	return {
		createMessages: function (roomId) {
	    var newMessagesRef = firebase.database().ref('messages').child(roomId);
	    return $firebaseArray(newMessagesRef);
	  },

	  checkBuzzWords: function (text) {
	  	var buzzWords = $firebaseArray(settingsRef.child('buzz-words'))

	  	return buzzWords.$loaded().then(function(list) {

		  	buzzWords.forEach(function(wordObj) {
		  		if (text.includes(wordObj.$id)) {
		  			return true;
		  		}
		  	})

	  		return false;

	  	})

	  },

	  checkVIPs: function (text) {
	  	var VIPs = $firebaseArray(settingsRef.child('VIPs'))

	  	return VIPs.$loaded().then(function(list) {

		  	VIPs.forEach(function(wordObj) {
		  		if (text.includes(wordObj.$id)) {
		  			return true;
		  		}
		  	})

	  		return false;

	  	})
	  	
	  }
	}
}