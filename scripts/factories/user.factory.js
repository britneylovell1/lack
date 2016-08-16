var angular = require('angular');
var app = angular.module('lack');

module.exports = function ($firebaseArray, $firebaseObject, $firebaseAuth) {

		function userExists(user) {

			var userListRef = firebase.database().ref().child('users');

			// when the userList is loaded...
			return $firebaseArray(userListRef).$loaded()
			.then(function(userList) {

				return userList.$getRecord(user.uid);

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
			  photoUrl: user.photoURL
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
		

		function assocUserTeam(user, teamId) {
			// add user to 'teams' model
			// add team to 'users' model

			// firebase.database().ref().child('users/' + user.uid + '/teams/' + teamId).set(true);
			// firebase.database().ref().child('teams/' + teamId + '/users/' + user.uid).set(true);

			var userInfo = {};
			var teamInfo = {};

			userInfo[teamId] = true;
			teamInfo[user.uid] = true;

			// add current team to the current user
			var userRef = firebase.database().ref().child('users/' + user.uid + '/teams');
			var userList = $firebaseArray(userRef);
			userList.$add(userInfo);
		
			// remove user's email from the team email-list and set it as user id/name
			// NOT FINISHED WITH THIS
			var teamRef = firebase.database().ref().child('teams/' + teamId + '/users');
			var teamList = $firebaseArray(teamRef);
			teamList.$add(teamInfo);

		}

		function createTeamAdmin(userId, teamId) {
			// create admin prop on 'teams' model
			// I think there's some faulty logic here...
			var adminObj = {};
			adminObj[userId] = true;

			firebase.database().ref().child('teams/' + teamId + '/admin').update(adminObj);
		}

  
	return {

		assocUserTeam: function(user, teamId) {
			// add user to 'teams' model
			// add team to 'users' model

			firebase.database().ref().child('users/' + user.uid + '/teams/' + teamId).set(true);
			firebase.database().ref().child('teams/' + teamId + '/users/' + user.uid).set(true);

		},

		addTeamAdmin: function() {
			// add another admin on 'teams' model
		},

		signIn: function(adminStatus) {

	      // Sign in Firebase using popup auth and Google as the identity provider.
	      authObj = $firebaseAuth();

	      return authObj.$signInWithPopup("google")
	      .then(function(result) {
	      	var user = result.user;


	        // create user if it doesn't exist in firebase
	        userExists(user)
	        .then(function(result) {
		        if (!result) {
		          createUser(user);
		        }
	        })
	        
	        // associate user with team
	        // not finished with this function
	        // replace members emails with member user id in 'teams' model
	        // assocUserTeam();

	        // if (adminStatus) {
	        // 	// add "admin" property on the current team + and set the user to "admin"
	        //   // not finished with this function
	        //   createTeamAdmin();

	        // }
	        return result.user;


	      })
	      .catch(function(error) {

					// NEED TO MAKE THIS ERROR ALERT PRETTY FOR THE USER
					console.error("Authentication failed:", error);

					// Handle Errors here.
				  var errorCode = error.code;
				  var errorMessage = error.message;

					alert(errorCode, "\nAuthentication failed:\n", errorMessage);

				});
	    },

	    login: function() {
	    	// Sign in Firebase using popup auth and Google as the identity provider.
	      authObj = $firebaseAuth();

	      authObj.$signInWithPopup("google")
	      .then(function(result) {
	      	// FIGURE OUT THE REST OF THIS
	      	// what do we want to do with the user after they log in?

	      	// if user is not in database (i.e. they haven't created an account through sign-up), redirect them so they do sign-up.

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

}