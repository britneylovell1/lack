var angular = require('angular');
var app = angular.module('lack');

module.exports = function ($firebaseArray, $firebaseObject) {
	function userExists(user) {
		var userListRef = firebase.database().ref().child('users');

		// when the userList is loaded...
		return $firebaseArray(userListRef).$loaded()
		.then(function(userList) {

			return userList.$getRecord(user.uid)
    
    })
    .then(function(result) {

			// check if user is in firebase
			if (result) {
				return true;
			} else {
				return false;
			}

		})
  }

  

	return {
			createUser: function(user) {

				// grab the user's google information
				var userInfo = {
				  name: user.displayName,
				  email: user.email,
				  photoUrl: user.photoURL
				};

			  // create the user obj in firebase + add the user info
			  firebase.database().ref('users').child(user.uid).update(userInfo);

			},
		
	    checkOrCreateUser: function(user) {
	    	if (userExists(user)) {
						// notify user that account already exists and redirect to team chat
						alert('Hey you already signed up! You can go to your team now')

					} else {
						// create the new user in firebase
						createUser(user);

					}
	    }
	}

}