var angular = require('angular');
var app = angular.module('lack');
var firebase = require('firebase');

// TODO:
// clear input field + reset $scope.team
// redirect to that team's state

module.exports = function($firebaseObject, $firebaseArray) {
	var currentTeamRef = null; //does this persist? - not when I refresh the page! Spend some time figuring out persistence 


	return {
		createTeam: function() {
		
			// create the team obj in firebase + get the reference to it
			var newTeamRef = firebase.database().ref('teams').push();
			currentTeamRef = newTeamRef;

			// return the team as a synchronized object
			return $firebaseObject(newTeamRef);
		},

		setCurrentTeam: function(currentTeamId) {
			// set the current team 
			currentTeamRef = firebase.database().ref('teams').child(currentTeamId);
		},

		// Does this work across the board?
		getCurrentTeam: function () {
			// get current team
			return $firebaseObject(currentTeamRef);

    },

    getTeamMembers: function () {
			// get all members of current team

			var teamMembersRef = currentTeamRef.child('users');
			return $firebaseArray(teamMembersRef);

    },

		assocUserTeam: function(user, team) {
			// associate the users with the teams

			// set up association variables
			var userInfo = {
				// userId: user.uid,		// This was for the first attempt
				// userName: user.displayName
			};
			userInfo[user.uid] = { userName: user.displayName };

			var teamId = team.id || team.$id;
			var teamInfo = {
				// teamId: teamId,			// This was for the first attempt
				// teamName: team.name
			};
			teamInfo[teamId] = { teamName: team.name };


			// create user + team entries and set up references to them
			var userRef = firebase.database().ref().child('users/' + user.uid + '/teams');
			var teamRef = firebase.database().ref().child('teams/' + teamId + '/users');


			// wait for the user to be created in the database
			firebase.database().ref().child('users/' + user.uid).once('child_added')
			.then(function() {

				// create associations in firebase
				userRef.update(teamInfo);
				teamRef.update(userInfo);

				// This was for the first attempt
    		// This is method created a new id for each $add()
				// $firebaseArray(userRef).$add(teamInfo);
				// $firebaseArray(teamRef).$add(userInfo);

			})

			return user;

		},

		addTeamAdmin: function(user, team) {
			// add a user as an admin on the teams model

			// set up association variables
			var userInfo = {
				// userId: user.uid,			
				// userName: user.displayName
			};
			userInfo[user.uid] = { userName: user.displayName };
			var teamId = team.id || team.$id; 

			// create admin entry and set up reference to it
			var teamRef = firebase.database().ref().child('teams/' + teamId + '/admin');

			// create the admin association in firebase
			teamRef.update(userInfo);

			// This was for the first attempt
    	// This is method created a new id for each $add()
			// $firebaseArray(teamRef).$add(userInfo);

		}

	}
}















