var angular = require('angular');
var app = angular.module('lack');
var firebase = require('firebase');

// TODO:
// remove setCurrentTeam?

module.exports = function($firebaseObject, $firebaseArray) {

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
			// don't need this function?
			var currentTeamRef = firebase.database().ref('teams').child(currentTeamId);
		},

		getCurrentTeam: function () {
			var currentUserId = firebase.auth().currentUser.uid;
			var teamRef = firebase.database().ref('users').child(currentUserId).child('teams');
			return $firebaseArray(teamRef);

    },

    getTeamMembers: function () {
			// get all members of current team

			var teamMembersRef = currentTeamRef.child('users');
			return $firebaseArray(teamMembersRef);

    },

		addTeamAdmin: function(user, team) {
			// add a user as an admin on the teams model

			// set up association variables
			var userInfo = {
				[user.uid]: { userName: user.displayName }
			};
			var teamId = team.id || team.$id;

			// create admin entry and set up reference to it
			var teamRef = firebase.database().ref().child('teams/' + teamId + '/admin');

			// create the admin association in firebase
			teamRef.update(userInfo);

		}

	}
}
