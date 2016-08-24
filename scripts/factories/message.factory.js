var angular = require('angular');
var app = angular.module('lack');

module.exports = function ($firebaseArray, UserFactory, $stateParams) {

	// var user = UserFactory.getCurrentUser();
 //  var settingsRef = firebase.database().ref('users/' + user.uid).child('settings');

  function getRoomMembers(roomId) {
  	var roomMembersRef = firebase.database().ref('rooms').child(roomId + '/members');
  	
  	return $firebaseArray(roomMembersRef);
  	
  }

  function getBuzzWords(memberId) {
  	var memberSettingsRef = firebase.database().ref('users/' + memberId).child('settings/buzz-words');
  	return $firebaseArray(memberSettingsRef);

  }

  function getVIPs(memberId) {
  	var memberSettingsRef = firebase.database().ref('users/' + memberId).child('settings/VIPs');
  	return $firebaseArray(memberSettingsRef);
  }

  // 
  function notifyUserBuzz(userId, roomId) {
  	// lets the user know that they got a message containing a buzz word
	// if ($stateParams.roomId === roomId){
	// 	return;
	// } else {
  		var buzzRef = firebase.database().ref('users/' + userId).child('rooms/' + roomId + '/buzzWord');
  	buzzRef.set(true);
	// }
  }

  function notifyUserVIP(userId, roomId) {
  	// lets the user know that they got a message from VIP
	// if ($stateParams.roomId === roomId){
	// 	return;
	// } else {
		var VipRef = firebase.database().ref('users/' + userId).child('rooms/' + roomId + '/VIP');
		VipRef.set(true);
	// }
  }

  function notifyUnread (userId, roomId) {
	// lets the user know that there are new unread messages in a room
	// if ($stateParams.roomId === roomId){
	// 	return;
	// } else {
		var unreadRef = firebase.database().ref('users/' + userId).child('rooms/' + roomId + '/unread');
		unreadRef.set(true);
	// }
	
  }


	return {
		createMessages: function (roomId) {
	    var newMessagesRef = firebase.database().ref('messages').child(roomId);
	    return $firebaseArray(newMessagesRef);
	  },

	  checkUnread: function (roomId) {
		  getRoomMembers(roomId).$loaded()
		  .then(function (roomMembers) {
			  roomMembers.forEach(function (member) {
				  notifyUnread(member.$id, roomId);
			  })
		  })
	  },

	  checkBuzzWords: function (text, roomId) {

	  	// get all room members
	  	getRoomMembers(roomId).$loaded()
	  	.then(function(roomMembers) {

	  		// get buzzwords for each member
	  		roomMembers.forEach(function(member) {
	  			getBuzzWords(member.$id).$loaded()
	  			.then(function(buzzWords) {

	  				// notify user is message contains a buzzword
	  				buzzWords.forEach(function(wordObj) {
				  		if (text.includes(wordObj.$id)) {
				  			notifyUserBuzz(member.$id, roomId);
				  		}
				  	})

	  			})
	  		})
	  	})
	  	.catch(function(error) {
	  		console.log(error);
	  	})

	  },

	  checkVIPs: function (sender, roomId) {
	  	// get the room members
	  	getRoomMembers(roomId).$loaded()
	  	.then(function (roomMembers) {

	  		// get VIPs for each member
	  		roomMembers.forEach(function(member) {

	  			// notify user if the sender is on their VIP list
	  			getVIPs(member.$id).$loaded()
	  			.then(function(vips) {

	  				if (vips.$getRecord(sender)){
	  					notifyUserVIP(member.$id, roomId);
	  				}

	  			})
	  		})

	  	})
	  	.catch(function(error) {
	  		console.log(error);
	  	})
	  	
	  }
	}
}