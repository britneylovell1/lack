var angular = require('angular');
var app = angular.module('lack');
var firebase = require('firebase');

// TODO:
// clear input field + reset $scope.team
// redirect to that team's state

module.exports = function($firebaseObject, $firebaseArray) {
	var currentTeamRef = null; //does this persist? - not when I refresh the page!


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
			var userInfo = {
				// userId: user.uid,
				// userName: user.displayName
			};
			userInfo[user.uid] = { userName: user.displayName };

			var teamId = team.id || team.$id;
			var teamInfo = {
				// teamId: teamId,
				// teamName: team.name
			};
			teamInfo[teamId] = { teamName: team.name };

			// set up references
			var userRef = firebase.database().ref().child('users/' + user.uid + '/teams');
			var teamRef = firebase.database().ref().child('teams/' + teamId + '/users');

			// wait for the user to be created in the database
			firebase.database().ref().child('users/' + user.uid).once('child_added')
			.then(function() {

				// // add team to 'users' model
				// $firebaseArray(userRef).$add(teamInfo);

				// // add user to 'teams' model
				// $firebaseArray(teamRef).$add(userInfo);

				userRef.update(teamInfo);
				teamRef.update(userInfo);
			})

			return user;

		},

		addTeamAdmin: function(user, team) {
			// add a user as an admin on the teams model
			var userInfo = {
				// userId: user.uid,
				// userName: user.displayName
			};
			userInfo[user.uid] = { userName: user.displayName };

			var teamId = team.id || team.$id; 
			var teamRef = firebase.database().ref().child('teams/' + teamId + '/admin');

			teamRef.update(userInfo);

			// $firebaseArray(teamRef).$add(userInfo);

		}

	}
}















