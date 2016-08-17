var angular = require('angular');
var app = angular.module('lack');

module.exports = function ($firebaseArray, $firebaseObject, $firebaseAuth) {

		function userExists(userId) {

			var userListRef = firebase.database().ref().child('users');

			// when the userList is loaded...
			return $firebaseArray(userListRef).$loaded()
			.then(function(userList) {

				return userList.$getRecord(userId);

	    })
	    .then(function(result) {

				// check if user is in firebase
				if (result) {
					return true;
				} else {
					return false;
				}

			})
			.catch(function(error) {
				console.log(error);
			})
	  }

	  function createUser(user) {

			// grab the user's google information
			var userInfo = {
			  name: user.displayName,
			  email: user.email,
			  photoUrl: user.photoURL,
			  teams: null
			};

		  // create the user obj in firebase + add the user info
		  firebase.database().ref('users').child(user.uid).update(userInfo);

		} 

		// why doesn't this function work in the catch block???
		function signInError(error) {

			// NEED TO MAKE THIS ERROR ALERT PRETTY FOR THE USER
			console.error("Authentication failed:", error);

			// Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;

			alert(errorCode, "\nAuthentication failed:\n", errorMessage);

		}
  
	return {

		assocUserTeam: function(user, team) {

			// associate the users with the teams
			var userInfo = {
				userId: user.uid,
				userName: user.displayName
			};

			var teamId = team.id || team.$id
			var teamInfo = {
				teamId: teamId,
				teamName: team.name
			};

			// set up references
			var userRef = firebase.database().ref().child('users/' + user.uid + '/teams');
			var teamRef = firebase.database().ref().child('teams/' + teamId + '/users');

			// wait for the user to be created in the database
			firebase.database().ref().child('users/' + user.uid).once('child_added')
			.then(function() {

				// add team to 'users' model
				$firebaseArray(userRef).$add(teamInfo);

				// add user to 'teams' model
				$firebaseArray(teamRef).$add(userInfo);
			})

			return user;

		},

		addTeamAdmin: function(user, team) {
			// add a user as an admin on the teams model
			var userInfo = {
				userId: user.uid,
				userName: user.displayName
			};
			var teamId = team.id || team.$id; 

			var teamRef = firebase.database().ref().child('teams/' + teamId + '/admin');

			$firebaseArray(teamRef).$add(userInfo);

		},

		signIn: function() {
      // Sign in Firebase using popup auth and Google as the identity provider.
      authObj = $firebaseAuth();

      return authObj.$signInWithPopup("google")
	      .then(function(result) {
	      	var userId = result.user.uid;
	      	var user = result.user;

	        userExists(userId)
			      .then(function(result) {
			      	
			        // create user if it doesn't exist in firebase
			        if (!result) {
			          createUser(user);
			        }
			      })

			     return user;

	      })
	      .catch(function(error) {

					// Handle Errors here.
				  var errorCode = error.code;
				  var errorMessage = error.message;

					alert(errorCode, "\nAuthentication failed:\n", errorMessage);
					console.log(error);
				});
    },

    login: function() {
    	// Sign in Firebase using popup auth and Google as the identity provider.
      authObj = $firebaseAuth();

      return authObj.$signInWithPopup("google")
      .then(function(result) {
      	var userId = result.user.uid;
      	var user = result.user;
      	// var home;

      	// if user is not in database (i.e. they haven't created an account through sign-up), redirect them so they do sign-up.
      	return userExists(userId)
      	.then(function(result) {

      		if(!result) {
      			alert('You do not have an account with us. Please make a team and sign up through Google');

      			// go to landing page
      			return home = false;
      		}
      		else {

      			// go to home state
		      	return home = true;
      		}

      	})

      })
      .catch(function(error) {

				// Handle Errors here.
			  var errorCode = error.code;
			  var errorMessage = error.message;

				alert(errorCode, "\nAuthentication failed:\n", errorMessage);

			});

    }

	}

}