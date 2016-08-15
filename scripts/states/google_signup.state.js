var angular = require('angular');
var app = angular.module('lack');

module.exports = function ($stateProvider) {
  $stateProvider.state('googleSignup', {
    url: '/sign-up',
    templateUrl: '/templates/google_signup.html',
    controller: function ($scope, $firebaseAuth, $firebaseArray) {
				// TODO:
				// make new user admin of the created team (on team model)
				// create new user in firebase (DONE)
				// grab user name, email, photo from google (DONE)
				// associate with team (waiting for that info from email)
				// upon signup/signin, place current team on the $rootscope (waiting for that info from email)
				// what's up with the pop-up? it pops up, but then signs you in automatically
				// make error message pretty for user
				// if user already exists, then inform user

			function createUser(user) {

				// grab the user's google information
				var userInfo = {
				  name: user.displayName,
				  email: user.email,
				  photoUrl: user.photoURL
				};

	      // create the user obj in firebase + add the user info
	      firebase.database().ref('users').child(user.uid).update(userInfo);

	    }

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
    	
      $scope.signUp = function() {

				// Sign in Firebase using popup auth and Google as the identity provider.
				$scope.authObj = $firebaseAuth();

				$scope.authObj.$signInWithPopup("google")
				.then(function(result) {

					// check if the user account alread exists
					if (userExists(result.user)) {
						// notify user that account already exists and redirect to team chat
						alert('Hey you already signed up! You can go to your team now')

					} else {
						// create the new user in firebase
						createUser(result.user);

					}

				})
				.catch(function(error) {
					// NEED TO MAKE THIS ERROR ALERT PRETTY FOR THE USER
					console.error("Authentication failed:", error);

					// Handle Errors here.
				  var errorCode = error.code;
				  var errorMessage = error.message;

					alert(errorCode, "\nAuthentication failed:\n", errorMessage);

				});
			}
    }

  });
};
